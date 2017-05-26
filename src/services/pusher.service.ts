import * as Pusher from 'pusher';
import {Log} from "./log.service";
import {PusherConfig} from "../types/configs/pusher-config.type";

export class PusherService {
    private connection = null;

    constructor(private pusherConfig: PusherConfig) {
        if (this.initConnection()) {
            Log.info('Pusher Connection Established')
        } else {
            Log.error('Could not connect to Pusher')
        }
    }

    public sendMessage(channel: string, event: string, content: any): boolean {
        this.connection.trigger(channel, event, content);

        return true;
    }

    private initConnection(): boolean {
        if (this.connection === null) {
            this.connection = new Pusher({
                appId: this.pusherConfig.appId,
                key: this.pusherConfig.key,
                secret: this.pusherConfig.secret,
                cluster: this.pusherConfig.cluster,
                encrypted: this.pusherConfig.encrypted
            });
        }

        return true;
    }

}