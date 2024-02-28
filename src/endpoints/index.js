export async function GET(a, b) {
    if (a instanceof web.Req && b instanceof web.Res) {
        switch (true) {
            case /^\/$/.test(a.endpoint):
                console.log('index')
                break;
            case /^\/favicon\.ico$/.test(a.endpoint):
                console.log('favicon')
                break;
            case /^\/js\/sl\.js$/.test(a.endpoint):
            case /^\/js\/sl\.min\.js$/.test(a.endpoint):
                console.log('js/sl')
                break;
            default:
                console.log('404')
        }
        b.res()
    }
}