export default interface HttpRequest {
    body: any;
    data?: any;
    files?: any;
    query: any;
    params: any;
    method: string;
    route: string;
    user?: any;
    headers: {
        Accept?: string;
        Authorization?: string;
        site_id?: string;
    };
}