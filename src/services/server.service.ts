import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Log} from "./log.service";
import {PusherService} from "./pusher.service";
import {Database} from "../models/database.model";

export class Server {
    /**
     * Hold the expressJs web hosting module.
     */
    private app: express.Express;

    constructor(private port: number = 6012, private pusherService: PusherService, private db: Database) {
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
        // Status route so we can check if the microservice is running
        this.app.get('/status', (req, res) => {
            return res.json({success: true, message: 'Service is active'});
        });
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
        this.app.listen(this.port, () => Log.info('Server now running on port ' + this.port));
    }
}