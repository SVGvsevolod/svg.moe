import qstr from 'node:querystring'
import cookie from 'cookie'

/**
 * Custom request info container
 * @param {IncomingMessage} request
 */
export function Req(a) {
    this._req = a
    this.cookies = 'object' == typeof a.headers && 'string' == typeof a.headers.cookie ? cookie.parse(a.headers.cookie) : undefined
    this.headers = 'object' == typeof a.headers ? a.headers : undefined
    this.method = 'string' == typeof a.method ? a.method : undefined
    this.qargs = 'string' == typeof a.url ? qstr.parse(a.url.split('?')[1]) : undefined
    this.remoteAddr = 'object' == typeof a.socket && 'string' == typeof a.socket.remoteAddress ? a.socket.remoteAddress : undefined
    this.remoteFam = 'object' == typeof a.socket && 'string' == typeof a.socket.remoteFamily ? a.socket.remoteFamily : undefined
    this.url = 'string' == typeof a.url ? a.url : undefined
}