import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
/**
 * Log error
 * @param {Error} a 
 */
export async function err(a) {
    if (a instanceof Error && 'string' == typeof a.stack) {
        let b = new Date,
            c = b.getUTCFullYear() +
         ' ' + (b.getUTCMonth() + 1).toString().padStart(2, '0') +
         ' ' + b.getUTCDate().toString().padStart(2, '0'),
            d = b.getUTCHours().toString().padStart(2, '0') +
         ' ' + b.getUTCMinutes().toString().padStart(2, '0') +
         ' ' + b.getUTCSeconds().toString().padStart(2, '0') +
         ' ' + b.getUTCMilliseconds().toString().padStart(3, '0')
        try {
            if (!existsSync('logs/err/' + c))
                await mkdir('logs/err/' + c, {
                    recursive: true
                })
            await writeFile(`logs/err/${c}/${d}.txt`,
            a.stack + ('number' == typeof a.errno ? '\nERRNO: ' + a.errno : ''),
            {
                encoding: 'utf8'
            })
        } catch (a) {
            
        }
    }
}