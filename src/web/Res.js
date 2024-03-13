import { serialize } from 'cookie'
/**
 * Custom response handler
 * @param {ServerResponse} a response
 * @param {Req} b request but as custom info container
 */
export class Res {
    constructor(a, b) {
        Object.defineProperties(this, {
            _res: {
                value: a
            },
            _str: {
                value: new stream.Readable
            },
            cookies: {
                enumerable: true,
                value: new web.Res.Cookies
            },
            finish: {
                configurable: true,
                enumerable: true,
                value: false
            },
            headers: {
                enumerable: true,
                value: Object.create(null)
            }
        })
        Object.defineProperties(this.headers, {
            'Content-Encoding': {
                enumerable: true,
                value: b.encode.br && !b.encode.deflate && !b.encode.gzip
                    ? 'br'
                    : b.encode.deflate && !b.encode.gzip
                        ? 'deflate'
                        : 'gzip'
            }
        })
        a.on('finish', () => {
            Object.defineProperty(this, 'finish', {
                enumerable: true,
                value: true
            })
        })
    }
    /**
     * Pushing output stuff into readstream
     * @param {*} a stuff
     */
    push(a) {
        if (a instanceof sys.Res)
            this._str.push(a.cache)
        else
            this._str.push(a)
    }
    /**
     * Redirect method
     * @param {number|string} a statuscode
     * @param {string} b destination
     */
    redir(a, b) {
        if (!this.finish
         && 'number' == typeof parseInt(a)
         && !isNaN(a)
         && parseInt(a) >= 300
         && parseInt(a) <= 308
         && 'string' == typeof b) {
            this._res.statusCode = a
            this._res.setHeader('Location', b)
            this._res.end()
        }
    }
    /**
     * Finish response method
     * @param {number|string} a statuscode
     * @param {object} b options
     */
    async res(a, b) {
        if (!this.finish) {
            if ('number' == typeof parseInt(a) && !isNaN(a))
                this._res.statusCode = parseInt(a)
            if ('object' == typeof a && 'string' == typeof a.mime
             || 'object' == typeof b && 'string' == typeof b.mime)
                try {
                    this.headers['Content-Type'] = web.mime(a.mime || b.mime)
                } catch (a) {
                    log.err(a)
                }
            if (Object.keys(this.cookies).length) {
                this.headers['Set-Cookie'] = []
                for (var i in Object.keys(this.cookies))
                    this.headers['Set-Cookie'].push(serialize(
                        Object.keys(this.cookies)[i],
                        this.cookies[Object.keys(this.cookies)[i]].data,
                        this.cookies[Object.keys(this.cookies)[i]]
                    ))
            }
            for (var i in Object.keys(this.headers))
                this._res.setHeader(Object.keys(this.headers)[i],
                    this.headers[Object.keys(this.headers)[i]])
            web.defhead(this._res)
            this.push(null)
            this._str._read = () => {}
            try {
                await stream.promises.pipeline(
                    this._str,
                    this.headers['Content-Encoding'] == 'br'
                    ? zlib.createBrotliDecompress()
                    : this.headers['Content-Encoding'] == 'deflate'
                        ? zlib.createDeflate()
                        : zlib.createGzip(),
                    this._res
                )
            } catch (a) {
                log.err(a)
            }
            this._res.end()
        }
    }
}