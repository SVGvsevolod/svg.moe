/**
 * HTTP requests handler
 * @param {IncomingMessage} a request
 * @param {ServerResponse} b response
 */
export async function handler(a, b) {
    const c = new web.Req(a),
        d = new web.Res(b, c),
        e = await import('../endpoints/index.js?' + new Date)
    if ('function' == typeof e[c.method])
        await e[c.method](c, d)
    log.req(c, d)
}