
const readline = require('readline');
var choice;
var questions = "\nПришло время выбрать самолет: \n1) пассажирский \n2) грузовой\n";

function Plane(name, distanse) {   
    this.name=name || "Самолетик"; 
    this.distanse=distanse || 0;
}

Plane.prototype.description = function () {
  console.log(`  Название: ${this.name}
  Дальность полета: ${this.distanse}`); 
    console.log("^Plane.description()");
};

function PassangerPlane(name, distanse, peopleCapacity){    
  this.type = "пассажирский";
  Plane.apply(this, arguments); 
  this.peopleCapacity = peopleCapacity || 0;
}

PassangerPlane.prototype = new Plane();
PassangerPlane.prototype.description = function(){
  console.log("^PassangerPlane.description");
  Plane.prototype.description.apply(this, arguments);
  console.log(`  Тип самолета: ${this.type}`);
}

function CargoPlane(name, distanse, weightCapacity){    
  Plane.apply(this, arguments); 
  this.type = "грузовой";
  this.weightCapacity = weightCapacity || 0;
}

CargoPlane.prototype = new Plane();
CargoPlane.prototype.description = function(){
  Plane.prototype.description.apply(this, arguments);
  console.log(`  Тип самолета: ${this.type}`);
  console.log("^CargoPlane.description");
}

function AirbusPassangerPlane(name, distanse, peopleCapacity, comment){    
  PassangerPlane.apply(this, arguments); 
  this.comment = comment;
}
 
AirbusPassangerPlane.prototype = new PassangerPlane();
AirbusPassangerPlane.prototype.description = function(){
  PassangerPlane.prototype.description.apply(this, arguments);
  console.log(`  Вместимость: ${this.peopleCapacity}
      Комментарий: ${this.comment}`);
  console.log("^AirbusPassangerPlane.description");
}

function BoeingPassangerPlane(name, distanse, peopleCapacity, comment){    
  PassangerPlane.apply(this, arguments); 
  this.comment = comment;
}

BoeingPassangerPlane.prototype = new PassangerPlane();
BoeingPassangerPlane.prototype.description = function(){
   PassangerPlane.prototype.description.apply(this, arguments);
    console.log(`  Комментарий: ${this.comment}`);
    console.log("^BoeingPassangerPlane.description");
}

function TyCargoPlane(name, distanse, weightCapacity, comment){    
  CargoPlane.apply(this, arguments); 
  this.comment = comment;
}

TyCargoPlane.prototype = new CargoPlane();
TyCargoPlane.prototype.description = function(){
  CargoPlane.prototype.description.apply(this, arguments);
  console.log(`  Комментарий: ${this.comment}`);
  console.log("^TyCargoPlane.description");
}

//passangers planes objs
airBus1 = new AirbusPassangerPlane("AirBus A320", 10000, 140, 'классненький');
airBus2 = new AirbusPassangerPlane("AirBus A318", 15000, 105, 'ну такой');
boeing1 = new BoeingPassangerPlane("Boeing 777", 10640, 400, "хороший");
boeing2 = new BoeingPassangerPlane("Boeing 707", 8640, 200, "норм");
//cargo planes objects
ty1 = new TyCargoPlane("Ту-136", 15000, 20000, "не оч");
ty2 = new TyCargoPlane("Ту-330", 17000, 24000, "оч");

ty1.description();

//arrays of planes
passangerPlanes = [airBus1, airBus2, boeing1, boeing2];
cargoPlanes = [ty1, ty2];
airport = [...passangerPlanes, ...cargoPlanes];

  console.log("\nИнтересные фактики: ")
  sumPeopleCapacity(passangerPlanes);
  sumWeightCapacity(cargoPlanes);

// summary of all people capacity-s
function sumPeopleCapacity(passangerPlanes){
  let sumPeopleCapacity=0;
  for (let i=0; i < passangerPlanes.length; i++){
    sumPeopleCapacity+= passangerPlanes[i].peopleCapacity;
  }
  console.log(` Вместимость всех самолетов аэропорта: ${sumPeopleCapacity} чел`);
}

// summary of all weight capacity-s
function sumWeightCapacity(cargoPlanes){
  let sumWeightCapacity=0;
  for (let i=0; i < cargoPlanes.length; i++){
    sumWeightCapacity+= cargoPlanes[i].weightCapacity;
  }
  console.log(` Грузоподъемность всех самолетов аэропорта: ${sumWeightCapacity} кг`);
}

// sort planes by distance
airport.sort(compareDistance);
//console.log(airport);
function compareDistance(a, b) {
  if (a.distanse > b.distanse) return 1;
  if (a.distanse < b.distanse) return -1;
}

// user, let's pick a plane
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(questions, (answer) => {
    firstChoice(answer.toString().trim());
    console.log('Выбор: ' + choice[0].type);
    let thePlane = choice[getRandomInt(0, choice.length-1)];
    console.log('\n Идем на взлет -вж-вж-вж:\n');
    thePlane.description();
    rl.close();
});

function firstChoice(answer) {
  switch(answer.toString().trim()){
    case '1': 
      choice = passangerPlanes;
      break;
    case '2': 
      choice = cargoPlanes;
      break;
    case 'пассажирский': 
      choice = passangerPlanes;
    case 'грузовой': 
      choice = cargoPlanes;
      break;
    default: {
    console.log('Вы ничего не выбрали. Мы решим сами: ');
    let luckyNumber = getRandomInt(0,1);
      if (luckyNumber === 1) {
        choice = cargoPlanes;
      } else choice = passangerPlanes;
    break;
  }
  }
}

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
