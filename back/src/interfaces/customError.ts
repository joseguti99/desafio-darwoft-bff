export default interface CustomError extends Error {
    status?: number;
    name: string;
    path?: string;
    type?: string;
    message: string;
}