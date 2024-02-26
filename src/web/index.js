// Imports
import { defhead } from './defhead.js'
import { mime } from './mime.js'
import { Conn } from './Conn.js'
import { Cookies } from './Cookies.js'
import { Req } from './Req.js'
import { Res } from './Res.js'
// Global stuff declaration
Res.Cookies = Cookies
global.web = {
    defhead,
    mime,
    Conn,
    Req,
    Res
}
// Exports
export { handler } from './handler.js'