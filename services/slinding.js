// abcdefabcbb

function longestSubstringWithoutRepeating(str) {
    let set = new Set()
    let left = 0;
    let maxLength = 0
    for (let right = 0; right < str.length; right++) {
        while (set.has(str[right])) {
            set.delete(str[right])
            left++
        }
        set.add(str[right])
        maxLength = Math.max(maxLength, right - left + 1)
    }
    return maxLength
}

function reversethe2darr(twodArray) {
    let i=0;
    while(i<twodArray.length){
        let left =  0;
        for(let right =  0 ;right < i.length;right++){
            let
        }
    }
    console.table({
        '2d':twodArray
    })
}

function movezeros(arr) {
    let left = 0;
    // while(left  < right){
    for (let right = 0; right < arr.length; right++) {
        if (arr[right] !== 0) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
            left++
        }
    }
    return arr;
}

console.log(reversethe2darr([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]))
// console.log(movezeros([2, 0, 20, 1, 0, 20, 2, 30, 3, 0, 2, 0, 4]));
