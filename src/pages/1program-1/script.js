let fName;
let sName;
let age;

do {   
  fName = prompt("Ваше имя:");
} while (fName === "")

do {   
  sName = prompt("Ваша фамилия:");
} while (sName === "")

do {   
  age = +prompt("Ваш возраст");
} while(Number.isNaN(age)|| age < 1)

let user = {};
let users = [];

user.sName = sName;
user.fName = fName;
user.age = age;

console.log(user);