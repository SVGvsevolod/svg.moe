// Imports
import http from 'node:http'
import https from 'node:https'
import { config } from 'dotenv'
import './log/index.js'
import './util/index.js'
import { handler } from './web/index.js'
// Laoding env vars
config()
// Start HTTP (Web) Server
http.createServer({
    keepAliveTimeout: 0
}, handler).listen(80)
// Start HTTPS (Web) Server
if (process.env.ca && process.env.cert && process.env.key)
    https.createServer({
        ca: process.env.ca,
        cert: process.env.cert,
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