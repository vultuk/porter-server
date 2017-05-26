import * as promise from 'bluebird';
import {IMain} from 'pg-promise';
import * as pgPromise from 'pg-promise';

export class Database {
    private db;

    constructor(connection: any) {
        let pgp: IMain = pgPromise({
            promiseLib: promise,
        });
        this.db = pgp(connection);
    }

    public query(query: string, values: any = {}) {
        return this.db.query(query, values);
    }

    public one(query: string, values: any = {}) {
        return this.db.one(query, values);
    }

    public task(task: any) {
        return this.db.task(task);
    }

}