// developers - авторя ЯП
// name - имя автора
// work - род деятельности автора
const developers = [
  {
    index: 0,
    name: "Брендан Эйх",
    work: "специалист в области информатики, программист, технический директор"
  },
  {
    index: 2,
    name: "Джеймс Гослинг",
    work: "специалист в области информационных технологий"
  },
  {
    index: 3,
    name: "Бьёрн Страуструп",
    work: "программист"
  }
]

// data - ЯП про которые должны быть рассказы
// name - название ЯП
// year - год выпуска ЯП
// filenameExtensions -расширения файлов
// influencedBy - ЯП оказавшие влияние
// affectedBy - ЯП испытавшие влияние ЯП
// developerIndex - уникальный идентификатор автора языка программирования
const data = [
  {
    name: "JavaScript",
    year: 1995,
    filenameExtensions: "js, mjs",
    influencedBy: ["AWK", "C", "HyperTalk", "Java", "Lua", "Perl", "Python", "Scheme", "Self"],
    affectedBy: ["ActionScript", "AtScript", "CoffeeScript", "Dart", "JScript .NET", "LiveScript", "Objective-J", "Opa", "QML", "Raku", "TypeScript"],
    developerIndex: 0,
  },
  {
    name: "Java",
    year: 1995,
    filenameExtensions: "java, class, jar, jad, jmod",
    influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
    affectedBy: ["Ada 2005", "BeanShell", "C#", "Chapel", "Clojure", "ECMAScript", "Fantom", "Gambas", "Groovy", "Hack", "Haxe", "J#", "Kotlin", "PHP", "Python", "Scala", "Seed7", "Vala"],
    developerIndex: 2,
  },
  {
    name: "C++",
    year: 1983,
    filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
    influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
    affectedBy: ["Ada", "C", "Modula-2", "Simula"],
    developerIndex: 3,
  },
];

function story() {
  const str = data.reduce(function (prevStr, item, index) {
    let autor = `${developers[index].name} - ${developers[index].work}`;
    let filenameExtensions = '.' + item.filenameExtensions;
    let filenameExtensionsArr = filenameExtensions.split(', ');
    let filenameExtensionsList = filenameExtensionsArr.join(', .');
    let affectedList = item.affectedBy;
    if (affectedList <= 4) {
      affectedList = item.affectedList.join(', ')
    }
    else {
      affectedList = affectedList.slice(0, 4);
      affectedList = affectedList.join(', ') + ' и другие языки программирования';
    };

    prevStr += ` ${item.name} - язык программирования, выпущеннный в ${item.year} году.
    Автором языка стал ${autor}.
    Файлы программ, написанных на ${item.name}, могут иметь расширения: ${filenameExtensionsList}.    
    ${item.name} испытал влияние ${item.influencedBy.length} языков программирования: ${item.influencedBy}.
    ${item.name} повлиял на ${affectedList}.
    \n`
    return prevStr
  }, "\n");
  console.log(str);
}

function Timer(time) {
  return function () {
    time--
    if (time < 1) { 
      return clearTimeout(time)
    }
    console.log(time + ' сек.')
  }
}

console.log('Данные отобразятся через 10 сек.');
setTimeout(story, 10000);
setInterval(Timer(10), 1000);


