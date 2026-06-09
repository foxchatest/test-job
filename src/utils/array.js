/**
 * @param {any[]} array
 * @param {(el: any) => boolean} check
 * @return {number}
 * */
export function countOfInArray(array, check) {
    let counter = 0
    array.forEach((i) => {
        if (check(i)) counter++
    })
    return counter
}
