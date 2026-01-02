const EventEmitter = require('events');

function Person(name) {
  this.name = name;
}

Person.prototype = Object.create(EventEmitter.prototype);
Person.prototype.constructor = Person;

Person.prototype.speaks = function(msg) {
  console.log(this.name + ' says: ' + msg);
};

const Sebastian = new Person('Sebastian');
const Kristina = new Person('Kristina');

Sebastian.on('says', function(msg) {
  this.speaks(msg);
}.bind(Sebastian));

Kristina.on('says', function(msg) {
  this.speaks(msg);
}.bind(Kristina));

Sebastian.emit('says', 'Hello, I am Sebastian!');
Kristina.emit('says', 'Hi, I am Kristina!');
