(function (){

  function addCreator(a){
    return function (b) {
        return a + b;
    }
}

  const add = addCreator(5);
  console.log(add(5)); //10
  console.log(addCreator(1)(3)); //4
})();



