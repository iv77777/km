// куда будем выводить результат на html странице
const resultKm = document.querySelector('#resultKm');
// кнопка расчитать
const buttonKm = document.querySelector('#buttonKm');
// иконка 
const folderjs = document.querySelector('#folder_js');
// попап
const popupjs = document.querySelector('#popup_js');
// галочка возле папки
const folderCounterJs = document.querySelector('#folder__counter_js');
// иконка сохранения результата
const folderImgJs = document.querySelector('#folderImg_js');
// инпут с результатом в попапе
const popupInputResultKmJs = document.querySelector('#popupInputResultKm_js');





// ********************<< localStorage >>*****************************************************
// Записуваем расход в локал localStorage
function addlocalStorage(value) {
  let ObjectValueKm = [{ valueKm: '' }];

  ObjectValueKm[0].valueKm = value;

  // переобразовуем масив valueKmObject в строку и записываем в valueKmObjectText
  let valueKmObjectText = JSON.stringify(ObjectValueKm);
  // добавляем valueKmObjectText в localStorage
  localStorage.setItem("usObjectKm", valueKmObjectText);
}

// Получает обект з LocalStorage
const getLocalStorage = function(keyName) {
  // Получает обект з LocalStorage
  const keyValueKm = localStorage.getItem(keyName);

  // если есть обект в localStorage
  if (keyValueKm !== null) {
    //переобразовуем из строки в масив и возвращаем
    return JSON.parse(keyValueKm);
  }
  // если localStorage пустой то возвращам пустой масив
  return [];
}


// ********************<< // localStorage >>*****************************************************
                                                 
// округление до сотых
var rounded = function (number) {
  return +number.toFixed(2);
}

//при загрузке странице, если localStorage не пустой то
if (getLocalStorage('usObjectKm').length){
  // добавляет значения в инпут попапа
  updateValue(getLocalStorage('usObjectKm')[0].valueKm);
  // показуем галочку
  folderCounterJs.style.opacity = '1';
}

// То шо делаем при клики по кнопке расчитать
buttonKm.addEventListener('click', function(){
  const inputRefuelingKm = document.querySelector('#inputRefuelingKm');
  const inputKm = document.querySelector('#inputKm');

  if (inputRefuelingKm.value > 0 && inputKm.value > 0){
    // вищитуем росход газа на 100 км.
    let valueKm = rounded(inputRefuelingKm.value / (inputKm.value / 100));
    resultKm.innerHTML = valueKm;

    // иметируем польот значения до иконки
    addValue();

    // записуваем valueKm в localStorage
    addlocalStorage(valueKm);

    // добавляет значения в инпут попапа
    updateValue(valueKm);
  }
});


// при клики по папке открываем попап
folderjs.addEventListener('click', function () {
  popupjs.classList.add('open');
  closePopup();
});

// закрывает попап 
function closePopup() {
  // кнопка закрытия попапа
  const closePopupJs= document.querySelector('#close-popup_js')

  closePopupJs.addEventListener('click', () =>{
    popupjs.classList.remove('open');
  });
}

// иметирует польот значения до иконки
function addValue(){
  // если у кнопки рассчитать нету класса _hold
  if(!buttonKm.classList.contains('_hold')){
    // то добавляем кнопке клас _hold
    buttonKm.classList.add('_hold');
    // и добавляем кнопке клас _fly
    buttonKm.classList.add('_fly');

    //результат на html странице
    const resultKmHtml = document.querySelector('#resultKm');

    // клонируем результат на html странице
    const resultKmHtmlFly = resultKmHtml.cloneNode(true);

    //resultKmHtmlFlyTop присваюваем позицею с верху
    const resultKmHtmlFlyTop = resultKmHtml.getBoundingClientRect().top;
    //resultKmHtmlFlyLeft присваюваем позицею с лева
    const resultKmHtmlFlyLeft = resultKmHtml.getBoundingClientRect().left + 10;


    // добавляем клону классы _flyValue _ibb
    resultKmHtmlFly.setAttribute('class', '_flyValue');
  
    // задаем позицею значению на странице
    resultKmHtmlFly.style.cssText = `
      left:${resultKmHtmlFlyLeft}px;
      top:${resultKmHtmlFlyTop}px;
      font-size:30px;
    `;

    // Выводим етот документ в самый конец боди
    document.body.append(resultKmHtmlFly);


    // получаем коорденаты галочки папки
    const folderjsFlyLeft = folderCounterJs.getBoundingClientRect().left - 15; 
    const folderjsFlyTop = folderCounterJs.getBoundingClientRect().top + 20; 

    // задаем клону позицею куда перемиститца на странице
    resultKmHtmlFly.style.cssText = `
      left:${folderjsFlyLeft}px;
      top:${folderjsFlyTop}px;
      opasity:0;
      font-size:10px;
    `;

    // когда клон долитит до папки 
    resultKmHtmlFly.addEventListener('transitionend', function() {
      folderImgJs.style.animationName = 'folderWidth';
      folderCounterJs.style.opacity = '1';
      // если у кнопки расчитать есть класс _fly
      if (buttonKm.classList.contains('_fly')){
        // то удаляем клон
        resultKmHtmlFly.remove();
        // запускаем функцию которая будет формирувать значения в папке (попапе)
        // updateValue();
        // у кнопки расщитать убераем класс _fly
        buttonKm.classList.remove('_fly');
      };
      // убераем у кнопке клас _hold
      buttonKm.classList.remove('_hold');// я добавил

      setTimeout(deletAnimation, 200);
      function deletAnimation() {
        folderImgJs.style.animationName = ''
      }
      
    });
  }
}

// добавляет значения в инпут попапа
function updateValue(value) {
  popupInputResultKmJs.value = value;
}

// при изменении значения в инпуте которий в попапе
popupInputResultKmJs.onchange = () =>{
  // меняем на ето значения и в localStorage
  addlocalStorage(popupInputResultKmJs.value);
}