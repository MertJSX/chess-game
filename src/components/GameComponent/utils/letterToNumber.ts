export function letterToNumber(letter: string) {
    return letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}