import { writeFile } from 'node:fs/promises'
export async function req(a, b) {
    if ('object' == typeof a && 'object' == typeof b) {
        try {
            await writeFile(`logs/req/${(new Date).toISOString()}.txt`,
            `REQ
RemoteAddr: ${'string' == typeof a.remAddr ? a.remAddr : ''}
RemFam: ${'string' == typeof a.remFam ? b.remFam : ''}
Method: ${'string' == typeof a.method ? a.method : ''}
Endpoint: ${'string' == typeof a.endpoint ? a.endpoint : ''}
QArgs: ${Object.keys(a.qargs).length ? '?' + a.url.split('?')[1] : ''}
Headers:`,
            {
                encoding: 'utf8'
            })
        } catch (a) {
            console.log(a)
        }
    }
}