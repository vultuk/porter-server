import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Log} from "./log.service";
import {ServerConfig} from "../types/configs/server-config.type";
import {Request} from "../types/requests/request.type";

export class Server {
    /**
     * Hold the expressJs web hosting module.
     */
    private app: express.Express;

    constructor(private serverConfig: ServerConfig) {
        this.app = express();

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        this.setCorsHeaders();
        this.setRoutes();
        this.startServer();
    }

    /**
     * Sets up all the required routes for this application.
     * Todo: Refactor this into a separate class
     */
    private setRoutes() {
        // Status route so we can check if the service is running
        if (this.serverConfig.serviceStatus && this.serverConfig.serviceStatus !== undefined) {
            this.app.get(`/${this.serverConfig.serviceStatus}`, (req, res) => {
                return res.json({success: true, message: 'Service is active'});
            });
        }

        this.serverConfig.routes.forEach(route => this.setSingleRoute(route));
    }

    private setSingleRoute(route: Request): void {
        if (route.action.toLowerCase() === 'resource') {
            this.setSingleRoute({endpoint: `${route.endpoint}`, action: 'get', controller: route.controller, method: 'all'} as Request);
            this.setSingleRoute({endpoint: `${route.endpoint}`, action: 'post', controller: route.controller, method: 'post'} as Request);
            this.setSingleRoute({endpoint: `${route.endpoint}/:id`, action: 'get', controller: route.controller, method: 'get'} as Request);
            this.setSingleRoute({endpoint: `${route.endpoint}/:id`, action: 'put', controller: route.controller, method: 'put'} as Request);
            this.setSingleRoute({endpoint: `${route.endpoint}/:id`, action: 'patch', controller: route.controller, method: 'patch'} as Request);
            this.setSingleRoute({endpoint: `${route.endpoint}/:id`, action: 'delete', controller: route.controller, method: 'delete'} as Request);
        } else {
            this.app[route.method.toLowerCase()](`/${route.endpoint}`, (req,res) => new route.controller(req,res,this.serverConfig.database)[route.action]());
        }
    }


    /**
     * Sets any headers we require for Cross Origin Requests.
     */
    private setCorsHeaders() {
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
            next();
        });
    }

    /**
     * Spools up the server on the required port.
     */
    private startServer() {
        this.app.listen(this.serverConfig.port, () => Log.info('Server now running on port ' + this.serverConfig.port));
    }
}