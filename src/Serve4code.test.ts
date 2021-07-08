import Serve4code from "./Serve4code";

async function main() {
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
