// 1)
function countdown(sec) {
  for (let i = sec; i >= 0; i--) {
    console.log(i);
  }
}
countdown(5);


// 2)
function logUntilMatch(num) {
  let random;
  do {
    random = Math.floor(Math.random() * (num + 1));
    console.log(random);
  } while (random !== num);
}
logUntilMatch(4);


// 3)
function checkNumber(n, callback) {
  n > 27 ? callback() : console.log("n ნაკლებია 27-ზე");
}
checkNumber(30, () => console.log("ეს ნამდვილად მეტია 27-ზე"));
checkNumber(10, () => console.log("ეს ნამდვილად მეტია 27-ზე"));


// 4)
function getFourUsersThen(api) {
  return fetch(api)
    .then((res) => res.json())
    .then((users) => users.slice(0, 4))
    .catch(console.error);
}
getFourUsersThen("https://jsonplaceholder.typicode.com/users").then(console.log);

async function getFourUsersAsync(api) {
  try {
    const users = await fetch(api).then((res) => res.json());
    return users.slice(0, 4);
  } catch (err) {
    console.error(err);
  }
}
getFourUsersAsync("https://jsonplaceholder.typicode.com/users").then(console.log);


// 5)
let people = [
  { name: "Giorgi", age: 25 },
  { name: "Nika", age: 15 },
  { name: "Mariam", age: 30 },
  { name: "Luka", age: 18 },
];

let groupedPeople = people.reduce(
  (acc, person) => {
    if (person.age > 10) acc.over10.push(person);
    if (person.age < 20) acc.under20.push(person);
    return acc;
  },
  { over10: [], under20: [] }
);
console.log(groupedPeople);


// 6)
function compareNumbers(a, b, callback) {
  callback(a > b ? "მეტია" : "ნაკლები ან ტოლია");
}
compareNumbers(10, 5, console.log);
compareNumbers(3, 7, console.log);
compareNumbers(5, 5, console.log);


// 7)
let products = [
  { name: "Mouse", price: 15 },
  { name: "Keyboard", price: 45 },
  { name: "USB Cable", price: 7 },
  { name: "Headphones", price: 29.9 },
  { name: "Webcam", price: 52 },
];

let groupedProducts = products.reduce(
  (acc, item) => {
    item.price > 20 ? acc.expensive.push(item) : acc.cheap.push(item);
    return acc;
  },
  { expensive: [], cheap: [] }
);
console.log(groupedProducts);