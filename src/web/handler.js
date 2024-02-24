/**
 * HTTP requests handler
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
export function handler(a, b) {
    const c = web._req = new web.Req(a),
        d = web._res = new web.Res(b, c)
    d.res()
}