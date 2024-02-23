import qstr from 'node:querystring'
import cookie from 'cookie'
/**
 * Custom request info container
 * @param {IncomingMessage} request
 */
export function Req(a) {
    Object.defineProperties(this, {
        _req: {
            value: a
        },
        cookies: {
            enumerable: true,
            value: 'object' == typeof a.headers
                && 'string' == typeof a.headers.cookie
                ? cookie.parse(a.headers.cookie)
                : undefined
        },
        encode: {
            enumerable: true,
            value: {}
        },
        endpoint: {
            enumerable: true,
            value: 'string' == typeof a.url
                ? a.url.split('?')[0]
                : undefined
        },
        headers: {
            enumerable: true,
            value: 'object' == typeof a.headers
                ? a.headers
                : undefined
        },
        method: {
            enumerable: true,
            value: 'string' == typeof a.method
                ? a.method
                : undefined
        },
        qargs: {
            enumerable: true,
            value: 'string' == typeof a.url
                ? qstr.parse(a.url.split('?')[1])
                : undefined
        },
        remAddr: {
            enumerable: true,
            value: 'object' == typeof a.socket
                && 'string' == typeof a.socket.remoteAddress
                ? a.socket.remoteAddress
                : undefined
        },
        remFam: {
            enumerable: true,
            value: 'object' == typeof a.socket
                && 'string' == typeof a.socket.remoteFamily
                ? a.socket.remoteFamily
                : undefined
        },
        url: {
            enumerable: true,
            value: 'string' == typeof a.url
                ? a.url
                : undefined
        }
    })
    Object.defineProperties(this.encode, {
        br: {
            enumerable: true,
            value: 'object' == typeof this.headers
                && 'string' == typeof this.headers['accept-encoding']
                ? this.headers['accept-encoding'].indexOf('br') > -1
                : false
        },
        deflate: {
            enumerable: true,
            value: 'object' == typeof this.headers
                && 'string' == typeof this.headers['accept-encoding']
                ? this.headers['accept-encoding'].indexOf('deflate') > -1
                : false
        },
        gzip: {
            enumerable: true,
            value: 'object' == typeof this.headers
                && 'string' == typeof this.headers['accept-encoding']
                ? this.headers['accept-encoding'].indexOf('gzip') > -1
                : false
        }
    })
}