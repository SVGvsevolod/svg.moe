import { contentType } from "mime-types"
/**
 * Generates content type string
 * @param {string} contenttype as extension
 * @returns {string} contenttype as header value
 */
export function mime(a) {
    switch (a) {
        case 'ico':
            return 'image/x-icon'
        default:
            return contentType(a)
    }
}