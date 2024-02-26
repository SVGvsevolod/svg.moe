/**
 * HTTP requests handler
 * @param {IncomingMessage} a request
 * @param {ServerResponse} b response
 */
export function handler(a, b) {
    const c = web._req = new web.Req(a),
        d = web._res = new web.Res(b, c)
    d.res()
}