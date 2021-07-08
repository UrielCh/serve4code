import { Server } from 'http';
import http, { IncomingMessage, ServerResponse } from 'http';
import { AddressInfo } from 'net';

/**
 * micro server to receive code
 */
export default class Serve4code {
    private server: Server | null = null;
    private port?: number;
    private codePromise: Promise<string> | null = null;
    private codeCb: ((code: string) => void) | null = null;
    /**
     * @param param the http parameter name that will contains the code. example: code
     */
    constructor(private param: string) {}
    /**
     * prepare for a new code.
     */
    private prepareCallback() {
        this.codePromise = new Promise((resolve) => this.codeCb = resolve);
    }
    /**
     * start a new server
     * @returns the port number bind by the server.
     */
    public start() : Promise<number> {
        return new Promise((resolve, reject) => {
            const srv = http.createServer((req: IncomingMessage, res: ServerResponse) => {
                const url = new URL(req.url as string, 'http://127.0.0.1');
                const code = url.searchParams.get(this.param) || ''
                if (this.codeCb && code) {
                    this.codeCb(code)
                    this.prepareCallback();
                    res.write('OK');
                } else {
                    res.write(`No code received waiting for a param named ${this.param}`);
                }
                res.end();
            });
            srv.listen(0, () => {
                const add = srv.address() as AddressInfo;
                this.port = add.port;
                resolve(this.port);
                this.prepareCallback();
            });
            this.server = srv;
        });
    }
    /**
     * @returns the next received code.
     */
    public getCode(): Promise<string> {
        if (!this.codePromise)
            throw Error('Call start() method first to start the server and get a listening port.')
        return this.codePromise;
    }
    /**
     * close the server.
     */
    public close() {
        if (this.server) {
            this.server.close();
            this.server = null;
        }
    }
}
