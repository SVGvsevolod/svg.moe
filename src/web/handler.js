/**
 * HTTP requests handler
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
export function handler(a, b) {
    let c = new web.Req(a)
    web.defhead(b)
    b.end()
    web._req = c
    web._res = b
}