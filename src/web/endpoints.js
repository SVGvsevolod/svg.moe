export async function GET(a, b) {
    if (a instanceof web.Req && b instanceof web.Res)
        switch (true) {
            case /^\/$/.test(a.endpoint)
                && 'object' == typeof a.headers
                && 'string' == typeof a.headers.accept
                && a.headers.accept.indexOf('text/html') > -1:
                b.res({
                    mime: 'html'
                })
                break;
            case /^\/favicon\.ico$/.test(a.endpoint):
                b.res()
                break;
            case /^\/js\/sl\.js$/.test(a.endpoint):
            case /^\/js\/sl\.min\.js$/.test(a.endpoint):
                b.push(sys.res['js/7'])
                b.res({
                    mime: 'js'
                })
                break;
            case /^\/js\/pixivimageredirect\.user\.js$/.test(a.endpoint):
                b.push(sys.res['js/12'])
                b.res({
                    mime: 'js'
                })
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