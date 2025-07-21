import { Router } from "express"
import validate from '../middlewares/validate';
import validation from './validations/auth';
import makeExpressCallback from "../middlewares/makeExpressCb";
import AuthController from "../controllers/auth";

const router = Router()

const controller = new AuthController();

router
    .route("/register")
    .post(
        validate(validation.register),
        makeExpressCallback(controller.register)
    )

router
    .route("/login")
    .post(
        validate(validation.login),
        makeExpressCallback(controller.login)
    )

export default router;