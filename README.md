# inheritance-console

Using javaScript created a hierarchy of planes through prototypes

Inheritance logics:
// parent constructor
  function Parent(name) {
  this.name = name || 'Adam';
 }
// add functionality to prototype
  Parent.prototype.say = function () {
  return this.name;
 };
// Child constructor
  function Child(name) {
  Parent.apply(this, arguments);
 }
  Child.prototype = new Parent();

  var kid = new Child('Patrick');
  kid.name; // “Patrick”
  kid.say(); // “Patrick”
  delete kid.name;
  kid.say(); // “Adam”