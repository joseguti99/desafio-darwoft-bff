import { Task } from "@prisma/client";
import { DataBaseError } from "../utils/errors";
import prismaClient from "../utils/prismaClient";
import AuthService from "./auth";

export default class TaskService {
    public async findOne(id: number): Promise<Task | null> {
        try {
            return await prismaClient.task.findUnique({
                where: { id }
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

    public async findAll(userId: number): Promise<Task[]> {
        try {
            return prismaClient.task.findMany({
                where: { userId: userId }
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

    public async create(data: { text: string; userId: number, title: string }): Promise<Task> {
        try {
            const authService = new AuthService();

            const user = await authService.findById(data.userId);

            if (!user) {
                throw new Error('No existe el usuario');
            }

            return await prismaClient.task.create({
                data: {
                    text: data.text,
                    title: data.title,
                    user: {
                        connect: { id: user.id }
                    }
                },
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

    public async update(id: number, data: { text: string; completed: boolean, title: string }): Promise<Task> {
        try {
            return prismaClient.task.update({
                where: { id },
                data
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
    public async delete(id: number): Promise<Task> {
        try {
            return prismaClient.task.delete({
                where: { id }
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}