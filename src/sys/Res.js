import { existsSync, watch } from 'node:fs'
import { readFile } from 'node:fs/promises'
/**
 * Resource handler
 * @param {string} a name
 * @param {string} b path
 * @param {string} c type (optional)
 * @returns {Res}
 */
export class Res {
    /**
     * Resource changes watcher
     */
    #_w
    constructor(a, b, c) {
        if ('object' == typeof sys.res && 'string' == typeof a && a.length && 'string' == typeof b) {
            switch (c) {
                default:
                    if (existsSync(b)) {
                        Object.defineProperties(this, {
                            cache: {
                                configurable: true,
                                value: undefined
                            },
                            name: {
                                enumerable: true,
                                value: a
                            },
                            path: {
                                enumerable: true,
                                value: b
                            },
                            type: {
                                enumerable: true,
                                value: 'static'
                            }
                        })
                        Object.defineProperty(sys.res, a, {
                            enumerable: true,
                            value: this
                        })
                        this.#_w = watch(b, function(a, b) {
                            if ('change' == a && this._res.path.indexOf(b) > -1)
                                sys.Res.load(this._res)
                        })
                        this.#_w._res = this
                        sys.Res.load(this)
                    }
            }
        }
    }
    /**
     * Loads content to cache
     * @param {Res} a 
     */
    static async load(a) {
        if (a instanceof sys.Res)
            switch (a.type) {
                default:
                    Object.defineProperty(a, 'cache', {
                        configurable: true,
                        value: (await readFile(a.path)).toString()
                    })
            }
    }
}