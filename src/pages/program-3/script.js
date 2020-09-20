let num;
let fNum = 1;
let i = 1;

do {   
  num = +prompt("Введите НАТУРАЛЬНОЕ число, чтобы узнать его факториал");
} while(Number.isNaN(num) || num < 1 )

// while (num > 1) {
//   fNum = fNum * num;
//   num = num - 1;
// }

while (i <= num) {
    fNum = fNum * i;
    i++;
  }

console.log (fNum);

alert(`Факториал от числа ${num} равен ${fNum}`);
