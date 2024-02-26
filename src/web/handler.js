/**
 * HTTP requests handler
 * @param {IncomingMessage} a request
 * @param {ServerResponse} b response
 */
export function handler(a, b) {
    const c = web._req = new web.Req(a),
        d = web._res = new web.Res(b, c)
    console.log(a.socket.localAddress)
    console.log(a.socket.localFamily)
    console.log(a.socket.localPort)
    console.log(a.socket.remoteAddress)
    console.log(a.socket.remoteFamily)
    console.log(a.socket.remotePort)
    d.res()
    //log.req(c, d)
}