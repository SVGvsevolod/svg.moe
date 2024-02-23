import { contentType } from "mime-types"
/**
 * Generates content type string
 * @param {string} contenttype as extension
 * @returns 
 */
export function mime(a) {
    switch (a) {
        case 'ico':
            return 'image/x-icon'
        default:
            return contentType(a)
    }
}