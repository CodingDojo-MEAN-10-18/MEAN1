

function Person(name, items) {
  if (!(this instanceof Person)) {
    return new Person(name, items);
  }

  const person = { name };

  this.name = name;
  this.items = items;

  // this.take = take
  //  implicit
  // return this;
}


Person.prototype.take = function take(item, target) {
  if (!target || !Array.isArray(target.items)) {
    throw new Error('target does not have an items array');
  }

  console.log(`${this.name} is doing the taking`);

  for (let index = 0; index < target.items.length; index++) {
    if (item === target.items[index]) {
      console.log('found item ', item);

      // slice  makes copy of content ['gold', 'keys', 'phone']
      // splice mutates original array ['keys', 'phone']

      target.items.splice(index, 1);

      this.items.push(item);

      return true;
    }
  }

  return false;
}

const bob = Person('Bob', ['gold', 'keys', 'phone']);
const sally = new Person('Sally', ['cheese', 'money', 'cat']);



console.log(bob);
console.log(sally);

const backpack = {
  items: ['compass', 'map', 'trailmix'],
};

console.log(backpack);

// backpack.take = bob.take;

// console.log(backpack);


sally.take('gold', bob);
bob.take('gold', sally);
bob.take('map',backpack);
sally.take.apply(backpack, ['gold', bob]);


console.log(bob);
console.log(sally);
console.log(backpack);
