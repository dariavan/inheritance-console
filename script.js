const readline = require('readline');
var choice;
// поиск в промежутке
// изменить боинг и второй, добавить уникалььное поле
// модное наследование
function Plane(name, distanse) {   
    this.name=name || "Самолетик"; 
    this.distanse=distanse || 0;
    this.isFlyable = function(){ return "Да";}
}

Plane.prototype.description = function () {
  console.log(`  Название: ${this.name}
  Дальность полета: ${this.distanse}`); 
    console.log("^Plane.description()");
};

function PassangerPlane(name, distanse, peopleCapacity, freeSeats){    
  this.type = "пассажирский";
  Plane.apply(this, arguments); 
  this.peopleCapacity = peopleCapacity || 0;
  this.freeSeats = freeSeats;
}
//PassangerPlane.prototype = Object.create(Plane.prototype); ????
// PassangerPlane.prototype = new Plane(); ??? why i need this aa?
PassangerPlane.prototype.description = function(){
  Plane.prototype.description.apply(this, arguments);
  console.log(`  Тип самолета: ${this.type}
  Вместимость: ${this.peopleCapacity}
  Свободные места: ${this.freeSeats}`);
  console.log("^PassangerPlane.description");
}

function CargoPlane(name, distanse, weightCapacity){    
  Plane.apply(this, arguments); 
  this.type = "грузовой";
  this.weightCapacity = weightCapacity || 0;
}

//CargoPlane.prototype = new Plane();
CargoPlane.prototype.description = function(){
  Plane.prototype.description.apply(this, arguments);
  console.log(`  Тип самолета: ${this.type}
  Грузоподъемность: ${this.weightCapacity}
  Доступное место для груза: ${this.freeSpace}`);
  console.log("^CargoPlane.description");
}

function AirbusPassangerPlane(name, distanse, peopleCapacity, freeSeats, comment){    
  PassangerPlane.apply(this, arguments); 
  this.comment = comment;
}
 
//AirbusPassangerPlane.prototype = new PassangerPlane();
AirbusPassangerPlane.prototype.description = function(){
  PassangerPlane.prototype.description.apply(this, arguments);
  console.log(`  Комментарий: ${this.comment}`);
  console.log("^AirbusPassangerPlane.description");
}

function BoeingPassangerPlane(name, distanse, peopleCapacity, freeSeats, wingsShape){    
  PassangerPlane.apply(this, arguments); 
  this.wingsShape = "правильная";
}

//BoeingPassangerPlane.prototype = new PassangerPlane();
BoeingPassangerPlane.prototype.description = function(){
   PassangerPlane.prototype.description.apply(this, arguments);
    console.log(`  Форма крыльев : ${this.wingsShape}`);
    console.log("^BoeingPassangerPlane.description");
}

function TyCargoPlane(name, distanse, weightCapacity, freeSpace, comment, armoredGlass){    
  CargoPlane.apply(this, arguments); 
  this.freeSpace = freeSpace;
  this.comment = comment;
  this.armoredGlass = "Да";
}

//TyCargoPlane.prototype = new CargoPlane();
TyCargoPlane.prototype.description = function(){
  CargoPlane.prototype.description.apply(this, arguments);
  console.log(`  Бронированное стекло: ${this.armoredGlass}
  Комментарий: ${this.comment}`);
  console.log("^TyCargoPlane.description");
}

//passangers planes objs
airBus1 = new AirbusPassangerPlane("AirBus A320", 1000, 140, 50, 'классненький');
airBus2 = new AirbusPassangerPlane("AirBus A318", 2000, 105, 60, 'ну такой');
boeing1 = new BoeingPassangerPlane("Boeing 777", 3000, 400, 10);
boeing2 = new BoeingPassangerPlane("Boeing 707", 4000, 200, 16);
//cargo planes objects
ty1 = new TyCargoPlane("Ту-136", 5000, 20000, 1000, "не оч");
ty2 = new TyCargoPlane("Ту-330", 6000, 24000, 3570, "оч");

//arrays of planes
passangerPlanes = [airBus1, airBus2, boeing1, boeing2];
cargoPlanes = [ty1, ty2];
airport = [...passangerPlanes, ...cargoPlanes];

  console.log("\nИнтересные факты: ")
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

// поиск в промежутке

var questions = ["\nПришло время выбрать самолет: \n1) пассажирский \n2) грузовой\n3) весь парк\n", 
"Сделай правильный выбор! ", "Введи количество перевозки: "];
rl.question(questions[0], (answer) => {
    firstChoice(answer.toString().trim());
    console.log('Выбор: ' + choice[0].type);
    console.log(' Доступные варианты: ');
     printAvailable(choice);
      var intervalFirst, intervalSecond;
      rl.question("Определим промежуток дальности перелета. Введите первое число: ", (answer) =>{
        if (isNaN(answer)){
             console.log("\nОтказано. Судя по всему, это не число.\n");
       rl.close();
      } else{
            intervalFirst = parseInt(answer);
            rl.question("Введите второе число: ", (answer) =>{
            if (answer < 0 || isNaN(answer)){
                console.log("\nОтказано. Промежуток не ясен\n");
             rl.close();
      } else{
        intervalSecond = parseInt(answer);     
          // delete inappropriate planes
          for (let i=0; i < choice.length; i++){
            if (choice[i].distanse < intervalFirst || choice[i].distanse > intervalSecond){
                choice.splice(i, 1); i--;
            }
          }
          if (choice.length == 0){
            console.log("Подходящих самолетов не найдено.")
            rl.close();
          }else{
            console.log(' Доступные варианты, учитывая выбранный промежуток: ');
            printAvailable(choice);
    rl.question(questions[1], (answer) =>{
      if (answer > choice.length || answer < 0 || isNaN(answer)){
      console.log("\nОтказано. Такого самолета нет.\n");
       rl.close();
      } else{
      console.log("Используем самолет номер " + answer.toString().trim() + "\n");
      let thePlaneNumber = answer;

      rl.question(questions[2], (answer) =>{
        if (choice[thePlaneNumber-1].type == "пассажирский"){
          choice[thePlaneNumber-1].freeSeats = booking(choice[thePlaneNumber-1], choice[thePlaneNumber-1].freeSeats,  answer);
          } else {          
         choice[thePlaneNumber-1].freeSpace = booking(choice[thePlaneNumber-1], choice[thePlaneNumber-1].freeSpase,  answer)
        }
        choice[thePlaneNumber-1].description();
        console.log("\n А самолет вообще летает ? " + choice[thePlaneNumber-1].isFlyable());
         rl.close();
      });
    }
  });
      }
      }
 });
      }
    });
});


  function printAvailable(choice){
    for (let i=0; i < choice.length; i++){
          console.log(` ${i+1}) Название ${choice[i].name}
          Дальность полета ${choice[i].distanse}`)
          if (choice[i].type == 'пассажирский'){
            (`Свободные места ${choice[i].freeSeats}`)
          }else (`Свободные места ${choice[i].freeSpace}`)
      }
  }

  function booking(plane, numberOfSpaces, answer){
    if (answer >= numberOfSpaces || answer < 0 || isNaN(answer)){
      console.log("\nОшибочка! Неправильное количество мест. Отказано.\n");
      return numberOfSpaces;
    } else {
      console.log("\nВы забронировали " + answer + " мест(а)\n ");
      if (plane.type == "пассажирский"){
      plane.freeSeats = plane.freeSeats-parseInt(answer);
      return plane.freeSeats;
    }else{
      plane.freeSpace = plane.freeSpace-parseInt(answer);
      return plane.freeSpace;
    }
  }
  }

function firstChoice(answer) {
  switch(answer.toString().trim()){
    case '1': 
      choice = passangerPlanes;
      break;
    case '2': 
      choice = cargoPlanes;
      break;
    case '3': 
      choice = airport;
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
