function plainChoice(){
  var continent = prompt('Давайте-ка определимся с видом самолета: \n1. пассажирский\n2. грузовой', '1/2');
  switch(continent){
    case '1':
      alert("Выбран пассажирский");
      break;
    case '2':
      alert("Выбран грузовой");
      break;
    case 'пассажирский': break;
    case 'грузовой': break;
    default: {
      alert("Что-то пошло не так. Давайте попробуем еще раз.");
      plainChoice(continent);
    }
  }
}

plainChoice();
