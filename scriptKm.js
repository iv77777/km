const resultKm = document.querySelector('#resultKm');
const buttonKm = document.querySelector('#buttonKm');

                                                 
// округление до сотых
var rounded = function (number) {
  return +number.toFixed(2);
}

let valueKm;



buttonKm.addEventListener('click', function(){
  const inputRefuelingKm = document.querySelector('#inputRefuelingKm');
  const inputKm = document.querySelector('#inputKm');

  // вищитуем росход газа на 100 км.
  if (inputRefuelingKm.value > 0 && inputKm.value > 0){
    valueKm = rounded(inputRefuelingKm.value / (inputKm.value / 100));
    resultKm.innerHTML = valueKm;
  }




  // ********************<< localStorage >>*****************************************************
  let usObjectKm = [{ valueKm: '' }];

  usObjectKm[0].valueKm = valueKm;

  // переобразовуем масив valueKmObject в строку и записываем в valueKmObjectText
  let valueKmObjectText = JSON.stringify(usObjectKm);
  // добавляем valueKmObjectText в localStorage
  localStorage.setItem("usObjectKm", valueKmObjectText);
// ********************<< // localStorage >>*****************************************************
});

