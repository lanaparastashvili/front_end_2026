//1)
let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]];
let flat = arr.flat(Infinity);
let unique = [];
for (let i = 0; i < flat.length; i++) {
  if (!unique.includes(flat[i])) {
    unique.push(flat[i]); 
  }
}


for (let i = 0; i < unique.length; i++) {
  for (let j = 0; j < unique.length - i - 1; j++) {
    if (unique[j] > unique[j + 1]) {
      let temp    = unique[j];
      unique[j]   = unique[j + 1];
      unique[j+1] = temp;
    }
  }
}

console.log(unique); 

//2)

let products = [
    { name : "Phone",  price: 1200, rating: 4.5 },
    { name: "Laptop", price: 2500, rating: 4.8 },
    { name: "Book",   price: 30,   rating: 4.9 },
    { name: "TV",     price: 800,  rating: 4.0 }
]
const affordable = products.filter(p => p.price<1000);
const best = affordable.reduce((top,current)=>{
    return current.rating>top.rating?current:top;
});
console.log(best);

//3)
let sentence = "dog cat dog bird cat dog fish bird";

const counts = sentence.split(" ").reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});

let maxWord  = "";
let maxCount = 0;

for (let word of Object.keys(counts)) {
  if (counts[word] > maxCount) {
    maxCount = counts[word];
    maxWord  = word;
  }
}

console.log(counts);         
console.log(`"${maxWord}" — ${maxCount}-ჯერ`)


//ForLoop tasks
//1)
function countChar(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i].toLowerCase() === char.toLowerCase()) {
      count++;
    }
  }
  return count;
}

console.log(countChar("banana", "a"));
console.log(countChar("Hello World", "l")); 


//2)
function isPalindrome(str) {
  const s = str.toLowerCase();
  const mid = Math.floor(s.length / 2);

  for (let i = 0; i < mid; i++) {
  
    if (s[i] !== s[s.length - 1 - i]) {
      return false; 
    }
  }
  return true;
}

console.log(isPalindrome("ana"));   
console.log(isPalindrome("abba"));  
console.log(isPalindrome("hello")); 

//3)
function mergeAndSum(arr1, arr2) {
  const merged = [...arr1, ...arr2];
  const unique = [...new Set(merged)];

  const sum = unique.reduce((acc, n) => acc + n, 0);

  return { unique, sum };
}

const result = mergeAndSum([1,2,3], [2,3,4,5]);
console.log(result.unique); 
console.log(result.sum);

//4)
function factorial(n) {
  if (n < 0) return "შეცდომა: უარყოფითი რიცხვი";
  if (n === 0 || n === 1) return 1; 

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i; 
  }
  return result;
}

console.log(factorial(5)); 
console.log(factorial(0));
console.log(factorial(10)); 

//5)
function twoSum(arr, target) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {

      if (arr[i] + arr[j] === target) {
        result.push([i, j]);
      }

    }
  }
  return result;
}

const nums = [1, 2, 3, 4, 5, 6, -7, -8];
console.log(twoSum(nums, -15));
console.log(twoSum([2,7,11,15], 9));
