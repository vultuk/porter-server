import {Log} from "../services/log.service";
import {Database} from "./database.model";
import {SuccessfulResponse} from "../types/responses/successful-response.type";
import {UnsuccessfulResponse} from "../types/responses/unsuccessful-response.type";
import {PusherService} from "../services/pusher.service";

export class Controller {
    constructor(protected request: any, protected response: any, protected db: Database = undefined, protected pusher: PusherService = undefined) {
        return this;
    }

    protected respondWithJson(response: SuccessfulResponse) {
        this.response.status(!response.code || response.code === undefined ? 200 : response.code);
        this.response.json({
            success: response.success,
            message: response.message,
            data: response.data,
            meta: response.meta
        });
        this.response.end();
    }

    protected respondWithError(response: UnsuccessfulResponse) {
        Log.error(response.data);
        this.response.status(!response.code || response.code === undefined ? 500 : response.code);
        this.response.json({
            success: response.success,
            message: !response.message || response.message === undefined ? "An unexpected error occurred" : response.message,
            data: response.data
        });
        this.response.end();
    }

    protected getQuery(key: string, defaultValue: any = undefined): any {
      return this.request.query[key] !== undefined ? this.request.query[key] : defaultValue;
    }

    protected getParam(key: string, defaultValue: any = undefined): any {
      return this.request.param[key] !== undefined ? this.request.param[key] : defaultValue;
    }

}
