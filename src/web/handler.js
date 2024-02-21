/**
 * HTTP requests handler
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
export function handler(a, b) {
    const c = new web.Req(a),
        d = new web.Res(b, c)
    d.res()
    web._req = c
    web._res = d
}