let rand = Math.floor(1 + Math.random() * 10);
let num;

console.log (rand);

// do {   
//   num = +prompt("Угадайте загаданное число");
// } while(Number.isNaN(num) || num < 1 || num !=rand )

while(Number.isNaN(num) || num < 1 || num !=rand ){   
    num = +prompt("Угадайте загаданное число (от 1 до 10)");
  } 

alert(`Вы угадали - загаданное число "${num}"`);