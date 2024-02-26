import { writeFile } from 'node:fs/promises'
export async function req(a, b) {
    if ('object' == typeof a && 'object' == typeof b) {
        try {
            await writeFile(`logs/req/${(new Date).toISOString()}.txt`,
            `REQ
Method: ${'string' == typeof a.method ? a.method : ''}
Endpoint: ${'string' == typeof a.endpoint ? a.endpoint : ''}
QArgs: ${Object.keys(a.qargs).length ? '?' + a.url.split('?')[1] : ''}
${(function(a){
    let b = ''
    for (let i = 0; i < Object.keys(a).length; i++)
        b += `${Object.keys(a)[i]}: ${a[Object.keys(a)[i]]}`
            + (i == Object.keys(a).length-1 ? '' : '\n')
    return b
})(a.headers)}${a.data ? '\nData: ' + a.data : ''}
RES
${b._res.statusCode}
${(function(a){
    let b = ''
    for (let i = 0; i < Object.keys(a).length; i++)
        if (a[Object.keys(a)[i]] instanceof Array)
            for (let j = 0; j < a[Object.keys(a)[i]].length; j++)
                b += `${Object.keys(a)[i]}: ${a[Object.keys(a)[i]][j]}`
                    + (j == a[Object.keys(a)[i]].length-1 ? '' : '\n')
        else
            b += `${Object.keys(a)[i]}: ${a[Object.keys(a)[i]]}`
                + (i == Object.keys(a).length-1 ? '' : '\n')
    return b
})(b.headers)}`,
            {
                encoding: 'utf8'
            })
        } catch (a) {
            console.log(a)
        }
    }
}