import { HttpRequest, HttpResponse } from "../interfaces"
import TaskService from "../services/task"
import httpStatus from "../utils/httpStatus"

export default class TaskController {
    public getAll = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        try {
            const userId = Number(httpRequest.user.userId);

            const taskService = new TaskService();

            const tasks = await taskService.findAll(userId);

            return { statusCode: httpStatus.OK, data: tasks }
        } catch (error) {
            return {
                statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                data: { message: "error al obtener tareas" }
            }
        }
    }

    public create = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        try {
            const { text, title } = httpRequest.body;
            const taskService = new TaskService();

            const data = {
                text,
                title,
                userId: Number(httpRequest.user.userId)
            }

            const taskCreated = await taskService.create(data);

            return { statusCode: httpStatus.OK, data: taskCreated }
        } catch (error) {
            return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, data: { message: error } }
        }
    }

    public update = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        try {
            const id = Number(httpRequest.params.id);

            const taskService = new TaskService();

            const task = await taskService.findOne(id);

            if (!task) {
                return { statusCode: httpStatus.NOT_FOUND, data: { message: "tarea no encontrada" } }
            }

            const { text, title, completed } = httpRequest.body;

            const taskUpdated = await taskService.update(id, { text, completed, title });

            return { statusCode: httpStatus.OK, data: taskUpdated }
        } catch (error) {
            return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, data: { message: error } }
        }
    }

    public deleteTask = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        try {
            const id = Number(httpRequest.params.id);

            const taskService = new TaskService();

            const task = await taskService.findOne(id);

            if (!task) {
                return { statusCode: httpStatus.NOT_FOUND, data: { message: "tarea no encontrada" } }
            }

            await taskService.delete(id);

            return { statusCode: 200, data: { message: "tarea eliminada exitosamente" } }
        } catch (error) {
            return { statusCode: httpStatus.INTERNAL_SERVER_ERROR, data: { message: error } }
        }
    }
}
