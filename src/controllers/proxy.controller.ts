import {Controller} from "../models/controller.model";
import * as request from 'request';

export class ProxyController extends Controller {
    private proxyUrl: string;

    public setProxyUrl(proxyUrl: string): this {
        this.proxyUrl = proxyUrl;

        return this;
    }

    public proxy() {
        let headers = this.request.headers;
        request({
            url: this.generateProxyUrl(),
            method: this.request.method,
            headers: {
                'User-Agent': headers['user-agent'],
                'Content-Type': headers['content-type'],
                'Authorization': headers['authorization'],
            }
        }, (e,r,body) => {
            this.response.status(r.statusCode);
            this.response.set(r.headers);
            this.response.end(body);
        });
    }

    private generateProxyUrl(): string {
        return `${this.proxyUrl}${this.request.url}`;
    }
}