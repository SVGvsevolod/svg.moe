/**
 * Log request
 * @param {Req} a request
 * @param {Res} b response
 */
export async function req(a, b) {
    if (a instanceof web.Req && b instanceof web.Res) {
        let c = log.name(),
            d = '',
            e = ''
        if ('object' == typeof a.headers)
            for (let i = 0; i < Object.keys(a.headers).length; i++)
                d += `${Object.keys(a.headers)[i]}: ${a.headers[Object.keys(a.headers)[i]]}`
                    + (i == Object.keys(a.headers).length-1 ? '' : '\n')
        if ('object' == typeof b.headers)
            for (let i = 0; i < Object.keys(b.headers).length; i++)
                if (b.headers[Object.keys(b.headers)[i]] instanceof Array)
                    for (let j = 0; j < b.headers[Object.keys(b.headers)[i]].length; j++)
                        e += `${Object.keys(b.headers)[i]}: ${b.headers[Object.keys(b.headers)[i]][j]}`
                            + (j == b.headers[Object.keys(b.headers)[i]].length-1 ? '' : '\n')
                else
                    e += `${Object.keys(b.headers)[i]}: ${b.headers[Object.keys(b.headers)[i]]}`
                        + (i == Object.keys(b.headers).length-1 ? '' : '\n')
        try {
            if (!fs.existsSync('logs/req/' + c[0]))
                await fs.promises.mkdir('logs/req/' + c[0], {
                    recursive: true
                })
            await fs.promises.writeFile(`logs/req/${c[0]}/${c[1]}.txt`,
            'REQ' +
            '\nSRC: ' + ('object' == typeof a.src
            && 'string' == typeof a.src.addr
            ? a.src.addr
            : '') + ':' + ('object' == typeof a.src
            && 'number' == typeof a.src.port
            ? a.src.port
            : '') +
            '\nDEST: ' + ('object' == typeof a.dest
            && 'string' == typeof a.dest.addr
            ? a.dest.addr
            : '') + ':' + ('object' == typeof a.dest
            && 'number' == typeof a.dest.port
            ? a.dest.port
            : '') +
            '\nMethod: ' + ('string' == typeof a.method ? a.method : '') +
            '\nEndpoint: ' + ('string' == typeof a.endpoint ? a.endpoint : '') +
            '\nQArgs: ' + (Object.keys(a.qargs).length ? '?' + a.url.split('?')[1] : '') +
            '\n' + d + (a.data ? '\nData: ' + a.data : '') +
            '\nRES\n' + b._res.statusCode + '\n' + e,
            {
                encoding: 'utf8'
            })
        } catch (a) {
            log.err(a)
        }
    }
}