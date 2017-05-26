import {Log} from "../services/log.service";
import {Database} from "./database.model";
import {SuccessfulResponse} from "../types/responses/successful-response.type";
import {UnsuccessfulResponse} from "../types/responses/unsuccessful-response.type";

export class Controller {
    constructor(protected request: any, protected response: any, protected db: Database) {
        return this;
    }

    protected respondWithJson(response: SuccessfulResponse) {
        this.response.status(response.code);
        this.response.json({
            success: response.success,
            message: response.message,
            data: response.data
        });
        this.response.end();
    }

    protected respondWithError(response: UnsuccessfulResponse) {
        Log.error(response.data);
        this.response.status(response.code);
        this.response.json({
            success: response.success,
            message: !response.message || response.message === undefined ? "An unexpected error occurred" : response.message,
            data: response.data
        });
        this.response.end();
    }

}