// Imports
import http from 'node:http'
import https from 'node:https'
import { config } from 'dotenv'
import 'node-json2html'
import './log/index.js'
import './sys/index.js'
import './util/index.js'
import { handler } from './web/index.js'
// Laoding env vars
config()
// Declaring resources
new sys.Res('js/7', 'node_modules/simple-landscape/sl.min.js')
new sys.Res('js/12', 'public/vault/12/.user.js')
new sys.Res('js/13', 'public/vault/13/.js')
// Start HTTP (Web) Server
http.createServer({
    keepAliveTimeout: 0
}, handler).listen(80)
// Start HTTPS (Web) Server
if (process.env.ca && process.env.crt && process.env.key)
    https.createServer({
        ca: process.env.ca,
        cert: process.env.crt,
        keepAliveTimeout: 0,
        key: process.env.key
    }, handler).listen(443)
// Logging process termination
process.on('exit', a => {
    process.stdout.write(`(${a}) by\n`)
})
// Interaction via Std
process.stdin.on('data', async a => {
    switch (a.toString()) {
        case 'exit\n':
        case 'quit\n':
            process.exit()
    }
})