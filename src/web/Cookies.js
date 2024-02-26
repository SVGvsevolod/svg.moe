/**
 * Response cookies container
 */
export class Cookies {
    /**
     * Add cookie method
     * @param {string} a name 
     * @param {string} b data 
     * @param {object} c attributes (optional)
     */
    add(a, b, c) {
        if ('string' == typeof a && 'string' == typeof b) {
            Object.defineProperty(this, a, {
                enumerable: true,
                value: {}
            })
            Object.defineProperties(this[a], {
                data: {
                    enumerable: true,
                    value: b
                },
                domain: {
                    enumerable: true,
                    value: 'object' == typeof c
                        && 'string' == typeof c.domain
                        ? c.domain
                        : undefined
                },
                expires: {
                    enumerable: true,
                    value: 'object' == typeof c
                        && c.expires instanceof Date
                        ? c.expires
                        : undefined
                },
                httpOnly: {
                    enumerable: true,
                    value: 'object' == typeof c
                        ? !!c.httpOnly
                        : undefined
                },
                maxAge: {
                    enumerable: true,
                    value: 'object' == typeof c
                        && 'number' == typeof parseInt(c.maxAge)
                        && !isNaN(parseInt(c.maxAge))
                        ? parseInt(c.maxAge)
                        : undefined
                },
                partitioned: {
                    enumerable: true,
                    value: 'object' == typeof c
                        ? !!c.partitioned
                        : undefined
                },
                path: {
                    enumerable: true,
                    value: 'object' == typeof c
                        && 'string' == typeof c.path
                        ? c.path
                        : undefined
                },
                priority: {
                    enumerable: true,
                    value: 'object' == typeof c
                        && 'low' == c.priority
                        || 'medium' == c.priority
                        || 'high' == c.priority
                        ? c.priority
                        : undefined
                },
                sameSite: {
                    enumerable: true,
                    value: 'object' == typeof c
                        && 'lax' == c.sameSite
                        || 'none' == c.sameSite
                        || 'strict' == c.sameSite
                        ? c.sameSite
                        : undefined
                },
                secure: {
                    enumerable: true,
                    value: 'object' == typeof c
                        ? !!c.secure
                        : undefined
                }
            })
        }
    }
}