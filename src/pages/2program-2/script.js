let a;
let b;

do {   
  a = +prompt("Введите Первое число");
} while(Number.isNaN(a)|| a < 1)

do {   
  b = +prompt("Введите Второе число");
} while(Number.isNaN(b)|| b < 1)

// сложение
function add (a,b) {
  return a+b;
}
let resultAdd = add(a,b);

// вычитание
function subtract (a,b) {
  return a-b;
}
let resultSubtract = subtract(a,b);

// деление
function divide (a,b) {
  return a/b;
}
let resultDivide = divide(a,b);

// умножение
function multiply (a,b) {
  return a*b;
}
let resultMultiply = multiply(a,b);

console.log(resultAdd);
console.log(resultSubtract);
console.log(resultDivide);
console.log(resultMultiply);

alert(`Результат сложения чисел "${a}" и "${b}" равен "${resultAdd}".
Результат вычитания из числа "${a}" числа "${b}" равен "${resultSubtract}".
Результат деления числа "${a}" на число "${b}" равен "${resultDivide}".
Результат умножения чисел "${a}" и "${b}" равен "${resultMultiply}".`);