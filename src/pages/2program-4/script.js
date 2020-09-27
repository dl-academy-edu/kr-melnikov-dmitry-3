(function () {
  function counterCreater(step) {
    let index = 0;
    let customStep = step|| 2;    
    function counter() {
      index += customStep;
      return index;
    }
    return counter;
  }

let myCounter1 = counterCreater(-1);
console.log(myCounter1()); // -1
console.log(myCounter1()); // -2
let myCounter2 = counterCreater(4);
console.log(myCounter2()); // 4
console.log(myCounter2()); // 8
let myCounter3 = counterCreater();
console.log(myCounter3()); // 2
console.log(myCounter3()); // 4
})();

