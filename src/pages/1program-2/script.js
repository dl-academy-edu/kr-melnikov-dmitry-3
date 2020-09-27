let maxNum;
let arr = [];

do {   
  maxNum = +prompt("Введите число до 50");
} while(Number.isNaN(maxNum) || maxNum < 1 || maxNum > 50)

for(i = 1; i <= 50; i++) {
  arr.push(i);
  if(maxNum === i) break;
}

for(let item of arr) {
  let num = item %4;
  if(num === 0) continue;
  console.log(item);
}


