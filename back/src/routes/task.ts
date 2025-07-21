import { Router } from "express"
import TaskController from "../controllers/task";
import validation from './validations/task';
import validate from "../middlewares/validate";
import makeExpressCallback from "../middlewares/makeExpressCb";
import authenticate from "../middlewares/auth";

const router = Router()

const controller = new TaskController();

router
    .route("/")
    .get(
        authenticate,
        makeExpressCallback(controller.getAll),
    );

router
    .route("/")
    .post(
        authenticate,
        validate(validation.create),
        makeExpressCallback(controller.create),
    );

router
    .route("/:id")
    .patch(
        authenticate,
        validate(validation.update),
        makeExpressCallback(controller.update)
    );

router
    .route("/:id")
    .delete(
        authenticate,
        validate(validation.deleteTask),
        makeExpressCallback(controller.deleteTask)
    );

export default router