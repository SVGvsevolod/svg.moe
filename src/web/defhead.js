/**
 * Declaring default HTTP headers procedure
 * @param {ServerResponse} a response
 */
export function defhead(a) {
    a.removeHeader('Connection')
    a.removeHeader('Date')
    a.removeHeader('Transfer-Encoding')
}