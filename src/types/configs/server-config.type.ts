import {Request} from "../requests/request.type";
import {PusherService} from "../../services/pusher.service";

export class ServerConfig {
    port: number = 6012;
    pusher?: PusherService;
    database?: any;
    serviceStatus?: string;
    routes: Request[] = [];
}