/**
 * Log error
 * @param {Error} a 
 */
export async function err(a) {
    if (a instanceof Error && 'string' == typeof a.stack) {
        let b = log.name()
        try {
            if (!fs.existsSync('logs/err/' + b[0]))
                await fs.promises.mkdir('logs/err/' + b[0], {
                    recursive: true
                })
            await fs.promises.writeFile(`logs/err/${b[0]}/${b[1]}.txt`,
            a.stack + ('number' == typeof a.errno ? '\nERRNO: ' + a.errno : ''),
            {
                encoding: 'utf8'
            })
        } catch (a) {
            
        }
    }
}