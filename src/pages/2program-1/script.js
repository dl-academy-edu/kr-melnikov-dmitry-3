function age(){
  let num;

  do {   
    num = +prompt("Укажите Ваш возраст");
  } while(Number.isNaN(num)|| num < 1);

  if (+num < 18) {
    alert (`Вы сообщили, что Ваш возраст ${num}, доступ предоставляется только совершеннолетним`);
    age();
  } else {
    alert ("Доступ открыт");
  }
};
age();