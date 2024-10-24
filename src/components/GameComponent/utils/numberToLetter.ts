export function numberToLetter(number: number) {
    return String.fromCharCode(number - 1 + 'a'.charCodeAt(0));
}