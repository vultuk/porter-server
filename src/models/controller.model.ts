import {Log} from "../services/log.service";
import {Database} from "./database.model";

export class Controller {
    constructor(protected request: any, protected response: any, protected db: Database) {
        return this;
    }

    protected respondWithJson(data: any, message: string, success: boolean = true, code: number = 200) {
        this.response.status(code);
        this.response.json({
            success: success,
            message: message,
            data: data
        });
        this.response.end();
    }

    protected respondWithError(error: any, message: string = null, code: number = 500) {
        Log.error(error);
        this.response.status(code);
        this.response.json({
            success: false,
            message: message !== null ? message : "An unexpected error occurred",
            data: error
        });
        this.response.end();
    }

}