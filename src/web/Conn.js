/**
 * Connection info container
 * @param {string} a addr
 * @param {number|string} b port
 * @returns {Conn}
 */
export function Conn(a, b) {
    Object.defineProperties(this, {
        addr: {
            enumerable: true,
            value: 'string' == typeof a
                ? a
                : undefined
        },
        port: {
            enumerable: true,
            value: 'number' == typeof parseInt(b)
                ? parseInt(b)
                : undefined
        }
    })
}