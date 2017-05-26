import {Controller} from "../../models/controller.model";

export class Request {
    endpoint: string;
    method: string;
    controller?: typeof Controller;
    action?: string;
    proxyUrl?: string;
}