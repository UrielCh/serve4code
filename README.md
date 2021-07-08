# serve4code
A simple webserver handeling http callback call.

Some API return a code via an http callback. (like google ones)

This sample start a webserver and wait for a code that will be provide in a http parameter named `code`.

```typescript
import Serve4code from "./Serve4code";

async function main() {
    // the param name used by the callback
    const codeParam = 'code';
    const srv = new Serve4code(codeParam);
    const port = await srv.start();
    console.log(`Wait a code param named "${codeParam}" to http://127.0.0.1:${port}`);
    console.log(`Open http://127.0.0.1:${port}/callback?${codeParam}=1234`);
    const code = await srv.getCode();
    console.log(`Code RCV: ${code}`);
    srv.close();
    console.log(`close called`);
}
main();
````

No dependences, small and useful.
