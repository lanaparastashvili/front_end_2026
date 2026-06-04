//1)
function evenaverage(arr){
    const event = arr.filter(num => num % 2 === 0);
    return event.reduce((sum, num) => sum + num, 0) / event.length;
}
console.log(evenaverage([1, 2, 3, 4, 5, 6]));


//2)
function wordcount(str){
    return str.trim().split(' ').length;
}
let s = "I love JavaScript";
console.log(wordcount(s));

//3)
function isprime(n){
    if(n<2)return false;
    for(let i=2; i<=Math.sqrt(n); i++){
        if(n % i === 0)return false;
    }
    return true;
}
console.log(isprime(7));
console.log(isprime(9));

//4)
let word = ["dog","elephant","cat","hippopotamus"];
function longestword(arr){
    return arr.reduce((longest,word) => word.length>longest.length ?word:longest,"");
}
console.log(longestword(word));

//5)
let arr = [3, 5, 3, 2, 5, 5, 3, 5];

function mostFrequent(arr) {
  let maxNum = arr[0];
  let maxCount = 0;

  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === arr[i]) count++;
    }
    if (count > maxCount) {
      maxCount = count;
      maxNum = arr[i];
    }
  }
  return maxNum;
}

console.log(mostFrequent(arr));

//6)
let nums = [1, 2, 3, 4, 5, 6, 7, 8];

function countEvenOdd(arr) {
  let even = 0;
  let odd = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      even++;
    } else {
      odd++;
    }
  }

  return { even, odd };
}

console.log(countEvenOdd(nums));

//7)
let nums2 = [10, 2, 33, 5, 7];

function findMin(arr) {
  let min = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return min;
}

console.log(findMin(nums2));