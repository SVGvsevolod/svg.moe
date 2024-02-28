export async function GET(a, b) {
    if (a instanceof web.Req && b instanceof web.Res)
        if ('string' != typeof a.endpoint)
            b.res(204)
        else
            switch (true) {
                case /^\/$/.test(a.endpoint)
                    && 'object' == typeof a.headers
                    && 'string' == typeof a.headers.accept
                    && a.headers.accept.indexOf('text/html') > -1:
                    b.res({
                        mime: 'html'
                    })
                    break;
                case /^\/favicon\.ico$/.test(a.endpoint)
                    && 'object' == typeof a.headers
                    && 'string' == typeof a.headers.accept
                    && a.headers.accept.indexOf('*/*') > -1:
                    b.res()
                    break;
                case /^\/js\/sl\.js$/.test(a.endpoint)
                    && 'object' == typeof a.headers
                    && 'string' == typeof a.headers.accept
                    && a.headers.accept.indexOf('*/*') > -1:
                case /^\/js\/sl\.min\.js$/.test(a.endpoint)
                    && 'object' == typeof a.headers
                    && 'string' == typeof a.headers.accept
                    && a.headers.accept.indexOf('*/*') > -1:
                    b.res()
                    break;
                case /.+/.test(a.endpoint)
                    && 'object' == typeof a.headers
                    && 'string' == typeof a.headers.accept
                    && a.headers.accept.indexOf('text/html') > -1:
                    b.redir(301, '/?e=404')
                    break;
                default:
                    b.res(204)
            }
}