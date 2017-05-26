import * as Pusher from 'pusher';
import {Log} from "./log.service";

export class PusherService {
    private connection = null;

    constructor(private appId: string, private key: string, private secret: string, private cluster: string, private encrypted: boolean = true) {
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
                appId: this.appId,
                key: this.key,
                secret: this.secret,
                cluster: this.cluster,
                encrypted: this.encrypted
            });
        }

        return true;
    }

}