import { Request, Response } from 'express';
import { ServerError } from '../utils/errors';
import { CustomError, DecodeJwt, HttpRequest, HttpResponse } from '../interfaces';

type Controller = (httpRequest: HttpRequest) => Promise<HttpResponse>;

interface RequestWithUser extends Request {
    user?: DecodeJwt;
}

export default function makeExpressCallback(controller: Controller) {
    return async (req: RequestWithUser, res: Response): Promise<any> => {
        try {
            const httpRequest: HttpRequest = {
                body: req.body,
                query: req.query,
                params: req.params,
                method: req.method,
                route: req.baseUrl + req.route.path,
                user: req.user,
                headers: {
                    Authorization: req.get('Authorization'),
                },
            };
            const httpResponse: HttpResponse = await controller(httpRequest);

            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }
            if (httpResponse.data) {
                httpRequest.body = httpResponse.data;
                return res.status(httpResponse.statusCode).send(httpRequest.body);
            }
            if (httpResponse.type && httpResponse.files) {
                res.type(httpResponse.type);
                return res.status(httpResponse.statusCode).send(httpResponse.files);
            } else {
                res.type('json');
                return res.status(httpResponse.statusCode).send(httpResponse.body);
            }

        } catch (error) {
            console.log(error);
            let customError: CustomError = error as CustomError;

            if (!customError.status) {
                customError = new ServerError(error as Error);
            }

            const {
                status = 500,
                name,
                path,
                type,
                message = 'Internal server error',
            } = customError;

            return res
                .status(status)
                .send({
                    ...(name ? { name } : {}),
                    ...(path ? { path } : {}),
                    ...(type ? { type } : {}),
                    ...(message ? { message } : {}),
                });
        }
    };
}