// const arr = [2, 1, 5, 1, 3, 2]
// const windowSize = 3

// function maxiMumWindowSubarraySum(arr, size){
//     let maxSum =  -Infinity
//     let windowSum  = 0
//     for(let i  = 0 ; i < size;i++){
//         windowSum += arr[i]
//     }
//     maxSum =  windowSum

//     for(let right = size ; right < arr.length;right++ ){
//         windowSum  += arr[right]
//         windowSum -=  arr[right-size]
//         maxSum =  Math.max(windowSum,maxSum)
//     }
//     return maxSum;
// }
// console.log(maxiMumWindowSubarraySum(arr,windowSize))

//  binary search 
// let arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
// let target = 23

// function binarySearch(arr,target){
//     let left =0
//     let right=arr.length-1
//     while(left <= right){
//         let mid = Math.floor((left +  right)/2)
//         if(arr[mid] == target){
//             return mid;
//         }
//         if(arr[mid]  <  target){
//             left =  mid +  1
//         }else{
//             right =  mid-1
//         }
//     }
//     return -1
// }


//  2d array reverse method 1 row reverse
function rowReverse(twoDArray) {
    console.table(twoDArray)

    for (let row = 0; row < twoDArray.length; row++) {
        let left = 0
        let right = twoDArray[row].length - 1
        while (left < right) {
            [twoDArray[row][left], twoDArray[row][right]] = [twoDArray[row][right], twoDArray[row][left]]
            left++
            right--
        }
    }
    console.table(twoDArray)

    return twoDArray;
    // console.table(twoDArray)

}


function transposeofArr(arr) {
    for (let row = 0; row < arr.length; row++) {
        for (let col = row+1; col < arr.length; col++) {
            [arr[row][col], arr[col][row]] = [arr[col][row], arr[row][col]]

        }
    }
    return arr;
}

function nintyDegreeRotate(arr){
   let  newone =  transposeofArr(arr);
   let  newon2 = rowReverse(newone)
   return newon2;

}
let twoDArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(nintyDegreeRotate(twoDArray))
