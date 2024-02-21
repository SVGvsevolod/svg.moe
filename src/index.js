// Imports
import { createServer } from 'node:http'
import { defhead } from './web/defhead.js'
import { handler } from './web/handler.js'
import { Req } from './web/Req.js'

// Global stuff
global.web = {
    defhead,
    Req
}

// Start HTTP (Web) Server
createServer({
    keepAliveTimeout: 0
}, handler).listen(80)

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