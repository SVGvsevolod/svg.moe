/**
 * Declaring default HTTP headers procedure
 * @param {ServerResponse} response
 */
export function defhead(a) {
    a.removeHeader('Connection')
}