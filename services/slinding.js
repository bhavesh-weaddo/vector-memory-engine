const arr = [2, 1, 5, 1, 3, 2]
const windowSize = 3

function maxiMumWindowSubarraySum(arr, size){
    let maxSum =  -Infinity
    let windowSum  = 0
    for(let i  = 0 ; i < size;i++){
        windowSum += arr[i]
    }
    maxSum =  windowSum

    for(let right = size ; right < arr.length;right++ ){
        windowSum  += arr[right]
        windowSum -=  arr[right-size]
        maxSum =  Math.max(windowSum,maxSum)
    }
    return maxSum;
}
console.log(maxiMumWindowSubarraySum(arr,windowSize))
