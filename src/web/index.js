// Imports
import { defhead } from './defhead.js'
import { mime } from './mime.js'
import { Cookies } from './Cookies.js'
import { Req } from './Req.js'
import { Res } from './Res.js'
// Global stuff declaration
global.web = {
    defhead,
    mime,
    Req,
    Res
}
web.Res.Cookies = Cookies
// Exports
export { handler } from './handler.js'