import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress, createDeflate, createGzip } from 'node:zlib'
import { serialize } from 'cookie'

/**
 * Custom response handler
 * @param {ServerResponse} response
 * @param {Req} request but as custom info container
 */
export class Res {
    constructor(a, b) {
        Object.defineProperties(this, {
            _res: {
                value: a
            },
            _str: {
                value: new Readable
            },
            cookies: {
                enumerable: true,
                value: new web.Res.Cookies
            },
            headers: {
                enumerable: true,
                value: {}
            }
        })
        Object.defineProperties(this.headers, {
            'Content-Encoding': {
                enumerable: true,
                value: 'object' == typeof b
                    && 'object' == typeof b.headers
                    && 'string' == typeof b.headers['accept-encoding']
                    ? !b.headers['accept-encoding'].indexOf('gzip')
                        ? 'gzip'
                        : !b.headers['accept-encoding'].indexOf('deflate')
                            ? 'deflate'
                            : !b.headers['accept-encoding'].indexOf('br')
                                ? 'br'
                                : undefined
                    : undefined
            }
        })
    }
    /**
     * Pushing output stuff into readstream
     * @param {*} stuff
     */
    push(a) {
        this._str.push(a)
    }
    /**
     * Finish response method
     * @param {number|string} statuscode
     * @param {object} options
     */
    async res(a, b) {
        if ('number' == typeof parseInt(a) && parseInt(a) != NaN)
            this._res.statuscode = parseInt(a)
        if ('object' == typeof b && 'string' == typeof b.mime)
            this.headers['Content-Type'] = web.mime(b.mime)
        this.headers['Set-Cookie'] = []
        for (var i in Object.keys(this.cookies))
            this.headers['Set-Cookie'].push(serialize(
                Object.keys(this.cookies)[i],
                this.cookies[Object.keys(this.cookies)[i]].data,
                this.cookies[Object.keys(this.cookies)[i]]
            ))
        for (var i in Object.keys(this.headers))
            this._res.setHeader(Object.keys(this.headers)[i], this.headers[Object.keys(this.headers)[i]])
        web.defhead(this._res)
        this.push(null)
        this._str._read = () => {}
        await pipeline(
            this._str,
            this.headers['Content-Encoding'] == 'br'
            ? createBrotliDecompress()
            : this.headers['Content-Encoding'] == 'deflate'
                ? createDeflate()
                : createGzip(),
            this._res
        )
        this._res.end()
    }
}