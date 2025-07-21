export default interface HttpResponse {
    statusCode: number;
    body?: any;
    data?: any;
    headers?: Record<string, string>;
    type?: string;
    files?: any;
}