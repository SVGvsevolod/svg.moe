/**
 * HTTP requests handler
 * @param {IncomingMessage} a request
 * @param {ServerResponse} b response
 */
export async function handler(a, b) {
    const c = new web.Req(a),
        d = new web.Res(b, c)
    await d.res()
    log.req(c, d)
}