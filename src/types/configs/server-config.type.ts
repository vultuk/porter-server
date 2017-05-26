import {PusherConfig} from "./pusher-config.type";
import {Request} from "../requests/request.type";

export class ServerConfig {
    port: number = 6012;
    pusher?: PusherConfig;
    database?: any;
    serviceStatus?: string;
    routes: Request[] = [];
}