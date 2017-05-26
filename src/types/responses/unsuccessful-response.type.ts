export class UnsuccessfulResponse {
    data: any;
    message?: string;
    success: boolean = false;
    code: number = 500;
}