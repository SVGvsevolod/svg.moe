// Imports
import { createServer } from 'node:http'
import { handler } from './web/index.js'
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