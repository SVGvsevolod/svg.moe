import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
/**
 * Log error
 * @param {Error} a 
 */
export async function err(a) {
    if (a instanceof Error && 'string' == typeof a.stack) {
        let b = log.name()
        try {
            if (!existsSync('logs/err/' + b[0]))
                await mkdir('logs/err/' + b[0], {
                    recursive: true
                })
            await writeFile(`logs/err/${b[0]}/${b[1]}.txt`,
            a.stack + ('number' == typeof a.errno ? '\nERRNO: ' + a.errno : ''),
            {
                encoding: 'utf8'
            })
        } catch (a) {
            
        }
    }
}