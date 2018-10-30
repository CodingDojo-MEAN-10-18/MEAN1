const mongoose = require('mongoose');

const { Schema } = mongoose;
// const Schema = mongoose.Schema;

// const o = {
//   a: 'this is a',
//   b: 'this is b'
// };

// const a = 'this is already a';

// // const c = o.a;
// // const b = o.b;
// const { a: c, b } = o;



// console.log('this is ==> ', a, b, c);

mongoose.connect('mongodb://localhost:27017/animals', { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('connected to mongodb'));

name = '';


const AnimalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'an animal name is required'],
    trim: true,
  },
  legs: {
    type: Number,
    required: [true, 'Give your animal legs!'],
    min: [0, 'You need more legs than that']
  },
  age: Number,
  isPet: {
    type: Boolean,
    default: true
  },
});


// Animal => collection => animals
const Animal = mongoose.model('Animal', AnimalSchema);

// const Animal = mongoose.model('Animal');

const animal = new Animal({
  name: ' Spot',
  legs: 4,
  age: 3,
});

animal.save()
  .then(function (animal) {
    console.log('saved ', animal);
  })
  .catch(function (error) {
    console.log(error.errors.name.message);
    console.log(error.errors.legs.message);

    const errors = Object.keys(error.errors).map(key => error.errors[key].message);


    // for (let index = 0; index < keys.length; index++) {
    //   console.log('key', keys[index]);

    //   console.log('message', error.errors[keys[index]].message)

    //   errors.push(error.errors[keys[index]].message);
    // }


    console.log('errors', errors)
  })

