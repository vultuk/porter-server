import {Request} from "../requests/request.type";
import {PusherService} from "../../services/pusher.service";
import {MarkdownConfig} from "./markdown-config.type";

export class ServerConfig {
    port: number = 6012;
    routes: Request[] = [];
    pusher?: PusherService;
    database?: any;
    serviceStatus?: string;
    markdown?: MarkdownConfig;
}