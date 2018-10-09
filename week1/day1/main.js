var index;
var myString;

myString = 'some string value';

// console.log(myString);

myString = 234234234;

// console.log(myString);


const array = ['asdfsadf', 234324, true, false];
// array = {};

// console.log(array.push('new content'));

// console.log('index before loop', index);

for (let index = 0; index < array.length; index++) {
  // console.log('index', index, array[index]);
}


// console.log('index after loop', index);

// for (var element in array) {
//   console.log('element ', element, array[element]);
// }

// for (var [index, content] of array.entries()) {
//   console.log('index', index, content);
// }


// var person = ['brown', 'blue', 23]

const person = {
  "eyes": 'brown',
  'hair': 'blue',
  age: 23,
  key: 'this is a key'
};

person.height = 234;

// console.log(person); 

// for (var key in person) {
//   console.log('key  => ', key, person[key]);
// }

var newScope = 'global content';


function sayHello(name) {
  newScope = 'scope content';

  console.log(`Hello ${name}`, person, newScope);

  // return newScope;
}



console.log(sayHello('Jason'), newScope);

