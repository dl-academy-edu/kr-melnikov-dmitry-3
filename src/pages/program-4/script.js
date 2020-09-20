let a;
let b;

do {   
  a = +prompt("Введите Число");
} while(Number.isNaN(a) || a < 1 )

do {   
  b = +prompt("Введите Cтепень, в которую возвести Число");
} while(Number.isNaN(b) || b < 1 )

let num = a;

for(i = 1; i < b; i++) {
  num = num * a;
}

console.log (num);

alert(`Число ${a} в степени ${b} равно ${num}`);
