// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question(`Пришло время выбрать самолет: 
// 1) пассажирский 
// 2) грузовой 
// `, (answer) => {
//   switch(answer){
//     case '1': console.log("пассажирский"); break;
//     case '2': console.log("грузовой"); break;
//     default: {
//     console.log("Что-то пошло не так, давай заново.")
//     rl.question(`1) пассажирский 
// 2) грузовой `, );
//     }
//   }
//   rl.close();
// });

var questions = [
  "Пришло время выбрать самолет:\n1)пассажирский \n2)грузовой"
];
function ask(i){
    process.stdout.write(`${questions[i]}\n`);
    process.stdout.write(" > ");
}

process.stdin.on('data', function (data){
  switch(data.toString().trim()){
    case '1': 
      choice = new PassangerPlane();
      choice.description();
      process.exit(); 
      break;
    case '2': 
      choice = new CargoPlane();
      process.exit(); 
      break;
    case 'пассажирский': 
      choice = new PassangerPlane();
      process.exit(); 
      break;
    case 'грузовой': 
      choice = new CargoPlane();
      process.exit(); 
      break;
    default: {
    console.log("Что-то пошло не так, давай заново."); break;
  }
}
});

var choice;
ask(0);

function Plane(name, distanse) {   
    this.name=name || "Самолетик"; 
    this.distanse=distanse || "0";
}

// Plane.prototype.description = function () {
//   console.log(`
//   Название: ${this.name}
//   Дальность полета: ${this.distanse}`); 
// };

function PassangerPlane(name, distanse, peopleCapacity){    
  this.type = "пассажирский";
  Plane.apply(this, arguments); 
  this.peopleCapacity = peopleCapacity || 0;
}

function CargoPlane(name, distanse, weightCapacity){    
  Plane.apply(this, arguments); 
  this.type = "грузовой";
  this.weightCapacity = weightCapacity || 0;
}

function AirbusPassangerPlane(name, distanse, peopleCapacity, comment){    
  PassangerPlane.apply(this, arguments); 
  this.comment = comment;
}
 
function BoeingPassangerPlane(name, distanse, peopleCapacity, comment){    
  PassangerPlane.apply(this, arguments); 
  this.comment = comment;
}

function TyCargoPlane(name, distanse, weightCapacity, comment){    
  CargoPlane.apply(this, arguments); 
  this.comment = comment;
}

function description (plane) {
      console.log(`
      Тип самолета: ${plane.type}
      Название: ${plane.name} 
      Дальность полета: ${plane.distanse}`
      );
      if (plane.weightCapacity !== undefined){
        console.log(`!Грузоподъемность: ${plane.weightCapacity}`);
      }
      if (plane.peopleCapacity !== undefined){
        console.log(`!Вместимость: ${plane.peopleCapacity}`);
      }
};
// passangers planes objs
airBus1 = new AirbusPassangerPlane("AirBus A320", 10000, 140, 'классненький');
airBus2 = new AirbusPassangerPlane("AirBus A318", 15000, 105, 'ну такой');
boeing1 = new BoeingPassangerPlane("Boeing 777", 10640, 400, "хороший");
boeing2 = new BoeingPassangerPlane("Boeing 707", 8640, 200, "норм");
// cargo planes objects
ty1 = new TyCargoPlane("Ту-136", 15000, 20000, "не оч");
ty2 = new TyCargoPlane("Ту-330", 17000, 24000, "оч");

// arrays of planes
passangerPlanes = [airBus1, airBus2, boeing1, boeing2];
cargoPlanes = [ty1, ty2];
airport = [...passangerPlanes, ...cargoPlanes];

sumPeopleCapacity(passangerPlanes);
sumWeightCapacity(cargoPlanes);

// summary of all people capacity-s
function sumPeopleCapacity(passangerPlanes){
  let sumPeopleCapacity=0;
  for (let i=0; i < passangerPlanes.length; i++){
    sumPeopleCapacity+= passangerPlanes[i].peopleCapacity;
  }
  console.log("All people capacity = " + sumPeopleCapacity);
}

// summary of all weight capacity-s
function sumWeightCapacity(cargoPlanes){
  let sumWeightCapacity=0;
  for (let i=0; i < cargoPlanes.length; i++){
    sumWeightCapacity+= cargoPlanes[i].weightCapacity;
  }
  console.log("All weight capacity = " + sumWeightCapacity);
}

// sort planes by distance
airport.sort(compareDistance);
console.log(airport);
function compareDistance(a, b) {
  if (a.distanse > b.distanse) return 1;
  if (a.distanse < b.distanse) return -1;
}
