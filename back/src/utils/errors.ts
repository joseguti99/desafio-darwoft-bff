import httpStatus from "./httpStatus";

export class DataBaseError extends Error {
    status: number;
    error: any;
	constructor(details: any) {
		super(`Error en la consulta a la base de datos.`);
		this.name = `Error: Query inválida`;
		this.status = httpStatus.BAD_REQUEST;
		this.error = details;
	}
}

export class BadRequestError extends Error {
    status: number;
    error: any;
	constructor(details: any) {
		super(`El formato de la petición es incorrecto.`);
		this.name = `Error: Query inválida`;
		this.status = httpStatus.BAD_REQUEST;
		this.error = details;
	}
}

export class ServerError extends Error {
    status: number;
    error: any;
	constructor(details: any) {
		super(`Error interno del servidor.`);
		this.name = `Error: Query inválida`;
		this.status = httpStatus.INTERNAL_SERVER_ERROR;
		this.error = details;
	}
}