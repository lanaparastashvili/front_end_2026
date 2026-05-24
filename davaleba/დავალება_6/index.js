//1)
function block() {
  for (let i = 1; i < 10000000000; i++) {}
}

function runBlockAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      block();
      resolve("block დასრულდა");
    }, 0);
  });
}

console.log("one");
runBlockAsync().then((msg) => console.log(msg));
console.log("two");


//2)
const promiseResolve = new Promise((resolve) => resolve("წარმატება!"));
const promiseReject = new Promise((_, reject) => reject(new Error("შეცდომა!")));


promiseResolve.then((v) => console.log(v)).catch(console.error);
promiseReject.then(console.log).catch((e) => console.error(e.message));


Promise.allSettled([promiseResolve, promiseReject]).then((results) => {
  results.forEach((r) => {
    if (r.status === "fulfilled") console.log("OK:", r.value);
    else console.log("FAIL:", r.reason.message);
  });
});

//3)
const p1 = new Promise((r) => setTimeout(() => r("A"), 300));
const p2 = new Promise((_, rej) => setTimeout(() => rej("B"), 100));
const p3 = new Promise((r) => setTimeout(() => r("C"), 150));  
const p4 = new Promise((_, rej) => setTimeout(() => rej("D"), 50));

Promise.any([p1, p2, p3, p4])
  .then((first) => console.log(first));  

//4)
const promises4 = [
  Promise.resolve("ok1"),
  Promise.reject("fail1"),
  Promise.resolve("ok2"),
  Promise.reject("fail2"),
];

Promise.allSettled(promises4).then((results) => {
  const stats = results.reduce(
    (acc, item) => {
      item.status === "fulfilled" ? acc.success++ : acc.failed++;
      return acc;
    },
    { success: 0, failed: 0 }
  );
  console.log(stats);
});

//5)
const promises5 = [
  Promise.resolve(1),
  Promise.reject("err1"),
  Promise.resolve(2),
  Promise.reject("err2"),
  Promise.resolve(3),
];

Promise.allSettled(promises5).then((results) => {
  const onlyRejected = results
    .filter((r) => r.status === "rejected")
    .map((r) => r.reason);
  console.log(onlyRejected); 
});

//6)
const api1 = "https://jsonplaceholder.typicode.com/users";
const api2 = "https://jsonplaceholder.typicode.com/posts";

async function fetchBothApis() {
  const [usersRes, postsRes] = await Promise.all([
    fetch(api1),
    fetch(api2),
  ]);

  const users = await usersRes.json();
  const posts = await postsRes.json();

  console.log("მომხმარებლები:", users.length);  
  console.log("პოსტები:", posts.length);        
}

fetchBothApis();