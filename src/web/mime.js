import { contentType } from "mime-types"
/**
 * Generates content type string
 * @param {string} a content type as extension
 * @returns {string} content type as header value
 */
export function mime(a) {
    switch (a) {
        case 'ico':
            return new util.MIMEType('image/x-icon')
        default:
            return new util.MIMEType(contentType(a))
    }
}