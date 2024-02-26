/**
 * Decode from Base64
 * @link https://developer.mozilla.org/docs/Glossary/Base64#the_unicode_problem
 * @param {string} a 
 * @returns 
 */
export function from(a) {
    return (new TextDecoder).decode(Uint8Array.from(atob(a),m=>m.codePointAt(0)))
}
/**
 * Encode to Base64
 * @link https://developer.mozilla.org/docs/Glossary/Base64#the_unicode_problem
 * @param {string} a 
 * @returns 
 */
export function to(a) {
    return btoa(String.fromCodePoint(...(new TextEncoder).encode(a)))
}