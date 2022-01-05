const resultKm = document.querySelector('#resultKm');
const buttonKm = document.querySelector('#buttonKm');

                                                 
// округление до сотых
var rounded = function (number) {
  return +number.toFixed(2);
}

buttonKm.addEventListener('click', function(){
  const inputRefuelingKm = document.querySelector('#inputRefuelingKm');
  const inputKm = document.querySelector('#inputKm');

  // вищитуем росход газа на 100 км.
  if (inputRefuelingKm.value > 0 && inputKm.value > 0){
    resultKm.innerHTML = rounded(inputRefuelingKm.value / (inputKm.value / 100));
  }

});

