import { User } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import { DataBaseError } from "../utils/errors";
import bcryptjs from "bcryptjs";

export default class AuthService {
    public async findOne(email: string): Promise<User | null> {
        try {
            return prismaClient.user.findUnique({
                where: {
                    email
                }
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

    public async findById(id: number): Promise<User | null> {
        try {
            return prismaClient.user.findUnique({
                where: { id }
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

    public async register(data: { email: string; password: string }): Promise<User> {
        try {
            const { email, password } = data;

            const hashedPassword = await bcryptjs.hash(password, 10);

            return prismaClient.user.create({
                data: {
                    email,
                    password: hashedPassword
                }
            });
        } catch (error) {
            throw new DataBaseError(error);
        }
    }

    public async login(data: { email: string; password: string }): Promise<User | null> {
        try {
            const user = await this.findOne(data.email);
            return user;
        } catch (error) {
            throw new DataBaseError(error);
        }
    }
}