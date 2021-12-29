

const result = document.querySelector('#result');


const button = document.querySelector('#button');

                                                 
// округление до сотых
var rounded = function (number) {
  return +number.toFixed(2);
}

button.addEventListener('click', function(){
  const inputRefueling = document.querySelector('#inputRefueling');
  const inputKm = document.querySelector('#inputKm');

  // вищитуем росход газа на 100 км.
  if (inputRefueling.value > 0 && inputKm.value > 0){
    result.innerHTML = rounded(inputRefueling.value / (inputKm.value / 100));
  }
 
  // Выводим сколько проехали километров
  // if (inputMileage.value > 0){
  //   totalЬileage.innerHTML = rounded(inputMileage.value * 1.60934);
  // }

});

