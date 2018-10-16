



function map(array, callback) {
  const results = [];

  for (let index = 0; index < array.length; index++) {
    const result = callback(array[index], index, array);
    results.push(result);
  }

  return results;
}

// function mapNums(array) {
//   const results = [];

//   for (let index = 0; index < array.length; index++) {
//     const result = square(array[index]);

//     results.push(result);
//   }

//   return results;
// }

const nums = [1203, 234, 993];

const str = ['cat', 'dog', 'horse'];

const res1 = map(str, (element, index) => element + ' in the hat at ' + index);
const res = map(str, function concat(element) {
  // console.log('inside transformation function');

  return element + ' in the hat'
});
const rez = map(nums, square);

// console.log('res ', res);
// console.log('res1 ', res1);
// console.log('rez ', rez);

function square(num) {
  return num * num;
}





// console.log('before');


// function sayHello(name) {
//   setTimeout(function () {
//     console.log(`Hello ${name}`)

//    }, 2000)
// }

// sayHello('Jason')

// console.log('after')




function getThingsFromDB(query, callback) {
  console.log('requesting data from db', query);

  return setTimeout(function () {
    const data = [
      'thing1', 'thing2', 'thing3'
    ];


    callback(data);
   }, 1500);

}


getThingsFromDB('select * from things;', function (things) {

  console.log('inside callback sometime later...', things);

  things.forEach(thing => console.log('got a thing', thing));
});


// console.log('things from db', things);
