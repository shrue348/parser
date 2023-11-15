console.log('Parse PDF loaded...')

var styles = `
  .pdf_result {
      position: absolute;
      margin: auto;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999;
    background-color: #fff;
    color: #000;
    padding: 1em;
    display: flex;
    gap: 1em;
  }
  .pdf_result_in {
    position: relative;
    width: 71.5em;
    height: 55.5em;
    box-sizing: border-box;
    border: 1px solid #000;
    margin-left: 2em;
    padding: 4em;
  }
  .pdf_result_overflow {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    row-gap: 1em;
    column-gap: 1em;
    overflow: hidden;
  }
  .pdf_result_title {
    font-style: italic;
    position: absolute;
    bottom: -1px;
    right: -1px;
    padding: 1em;
    border: 1px solid #000;
  }
  .img_wrap {
    position: relative;
		height: 280px;
  }
  .img_wrap:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1000px;
    border-top: 1px solid red;
  }
	.img_wrap img {
    max-height: 100%;
		display: block;
  }
`;
var styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

var schemeUrl = 'https://raw.githubusercontent.com/shrue348/parser/main/img/';
var body = document.querySelector('body');
var table = document.querySelector('#automatic_table');
var result = document.createElement('div');
var data = [];
var zoom = 1;
var height = 280;
var input220ids = [87, 88, 89, 90, 91, 92, 93, 95, 96, 97 , 98, 99];

// Устанавливаем ввод
data.push({
  title: 'Ввод 380',
  description: 'Ввод 380',
  count: 1,
});

// Парсим таблицу хар-к
var rows = table.querySelectorAll('tr');
rows.forEach(function(el){
  var values = el.querySelectorAll('td');

  if (values[0] && values[1]) {
    data.push({
      title: values[0].innerText,
      description: values[1].innerText,
      count: Number(values[2].innerText),
    });
  }
});

// Ищем вентиляторы
$('h4:contains("Вентилятор")').next('table.attribute_table').each(function(){
  var title = 'Мощность двигателя';
  var description = $(this).find('th:contains("Мощность двигателя")').next('td').text();
  var count = Number($(this).find('th:contains("Число вентиляторов")').next('td').text()) || 1;

  if ($(this).find('th:contains("Резерв мультифэна")')) {
    count += 1;
  }

  data.push({
    title: title,
    description: description,
    count: count,
  });
});

// Ищем электронагреватели
$('h4:contains("Электронагреватель")').next('table.attribute_table').each(function(){
  var title = 'Установленная мощность нагревателя';
  var description = $(this).find('th:contains("Установленная мощность нагревателя")').next('td').text();
  var count = 1;

  data.push({
    title: title,
    description: description,
    count: count,
  });
});

// Заполняем PDF
function makePDF(){
  var doctitle = data[0].title + ' ' + data[0].description;
  
  result.classList.add('pdf_result');
  result.id = 'RESULT';
  body.appendChild(result);

  var resultIn = document.createElement('div');
  resultIn.classList.add('pdf_result_in');
  result.appendChild(resultIn);

  var resultOverflow = document.createElement('div');
  resultOverflow.classList.add('pdf_result_overflow');
  resultIn.appendChild(resultOverflow);

  var resultTitle = document.createElement('div');
  resultTitle.innerText = doctitle;
  resultTitle.classList.add('pdf_result_title');
  resultIn.appendChild(resultTitle);

  var downloadBtn = document.createElement('button');
  downloadBtn.type = 'button';
  downloadBtn.innerText = 'Скачать PDF';
  downloadBtn.onclick = savePDF;
  result.appendChild(downloadBtn);

  var zoomPlusBtn = document.createElement('button');
  zoomPlusBtn.type = 'button';
  zoomPlusBtn.innerText = 'Zoom +';
  zoomPlusBtn.onclick = zoomPlus;
  result.appendChild(zoomPlusBtn);

  var zoomMinusBtn = document.createElement('button');
  zoomMinusBtn.type = 'button';
  zoomMinusBtn.innerText = 'Zoom -';
  zoomMinusBtn.onclick = zoomMinus;
  result.appendChild(zoomMinusBtn);


  function createImage(src){
    var imgWrap = document.createElement('div');
    imgWrap.classList.add('img_wrap');

    var img = document.createElement('img');
    img.src = schemeUrl + src;

    imgWrap.appendChild(img);
    resultOverflow.appendChild(imgWrap);
  }

  function savePDF(){
    var printOpt = {
      margin: 0,
      filename: doctitle + '.pdf',
      image: { type: 'jpg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    $(downloadBtn).hide();
    $(zoomPlusBtn).hide();
    $(zoomMinusBtn).hide();
    result.style.position = 'relative';

    html2pdf().set(printOpt).from(document.querySelector('#RESULT')).save().then(function(){
      // result.remove();
      // location.reload();

			$(downloadBtn).show();
			$(zoomPlusBtn).show();
			$(zoomMinusBtn).show();
    });
  }
  
  function zoomPlus(){
		height += 10;
		$('.img_wrap').css('height', height);
  }
  
  function zoomMinus(){
		height -= 10;
		$('.img_wrap').css('height', height);
  }

  data.forEach(function(el) {
    var dataObj = arr.find(function(dataEl){
      return dataEl.name == el.description
    });

    if (dataObj) {
      el.data = dataObj;
    }
  });

  data.sort(function(a, b){
    if (!a.data || !b.data) return 1;

    return (
      a.data
      && b.data
      && a.data.priority
      && b.data.priority
      && a.data.priority < b.data.priority
    ) ? -1 : 1;
  });

  data = data.filter(function(el){
    return !!el.data;
  });

  data.forEach(function(el) {
    for (var i = 0; i < el.count; i++) {
      el.data.imgs.forEach(createImage);
    }
  });

  // устанавливаем размер картинок
  var imgCount = $('.img_wrap').length;
  height = 250; 
  if (imgCount > 10) height = 210; 
  if (imgCount > 20) height = 190; 
  if (imgCount > 30) height = 170; 
  if (imgCount > 35) height = 150; 
  var styles2 = `
    .img_wrap {
			height: ${height}px;
    }
  `;
  var styleSheet2 = document.createElement('style');
  styleSheet2.innerText = styles2;
  document.head.appendChild(styleSheet2);
  // savePDF(
}

var htmlToPdf = document.createElement('script');
htmlToPdf.id = 'HTML2PDF';
htmlToPdf.async = true;
htmlToPdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
htmlToPdf.onload = makePDF;
body.appendChild(htmlToPdf);

// Данные с картинками и количеством
var arr = [
  {
    id: 1,
    name: 'Датчик перепада давления PDS500 (600)',
    imgs: [
      'Датчик перепада давления.jpg'
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 2,
    name: 'Датчик температуры канальный Pt1000',
    imgs: [
      'Канальный датчик.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 3,
    name: 'Датчик температуры наружный Pt 1000',
    imgs: [
      'Наружный датчик.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 4,
    name: 'Термостат защиты от замерзания 3м, TF30,авт.сброс',
    imgs: [
      'Термостат.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 5,
    name: 'Термостат защиты от замерзания 6м, TF30,авт.сброс',
    imgs: [
      'Термостат.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 6,
    name: 'Термостат защиты от замерзания 11,5м, TF30,авт.сброс',
    imgs: [
      'Термостат.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 7,
    name: 'Накладной датчик температуры Pt 1000',
    imgs: [
      'датчик обратной воды.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 8,
    name: 'Переключатель двухпозиционный OFF-ON/ON-OFF',
    imgs: [],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 9,
    name: 'Переключатель двухпозиционный OFF-ON/ON-OFF с сигнальными лампами',
    imgs: [
      'Местный выключатель.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 10,
    name: 'Панель управления ПУ-3',
    imgs: [
      'ПУ3.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 11,
    name: 'Регулятор скорости круглого канального вентилятора 220В',
    imgs: [
      'СБ033.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 12,
    name: 'Регулятор скорости 1.5',
    imgs: [
      'Симисторный регулятор.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 13,
    name: 'Датчик температуры комнатный PT1000 ',
    imgs: [
      'Комнатный датчик.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 14,
    name: 'Канальный преобразователь влажности и температуры ',
    imgs: [
      'Датчик влажности.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 15,
    name: 'Смесительный узел с сервоприводом FB-MU40-1.6 HW-15',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 16,
    name: 'Смесительный узел с сервоприводом FB-MU40-2.5 HW-15',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 17,
    name: 'Смесительный узел с сервоприводом FB-MU40-4.0 HW-20',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 18,
    name: 'Смесительный узел с сервоприводом FB-MU60-4.0 HW-20',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 19,
    name: 'Смесительный узел с сервоприводом FB-MU60-6.3 HW-20',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 20,
    name: 'Смесительный узел с сервоприводом FB-MU60-10 HW-25',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 21,
    name: 'Смесительный узел с сервоприводом FB-MU80-6.3 HW-20',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 22,
    name: 'Смесительный узел с сервоприводом FB-MU80-10 HW-25',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 23,
    name: 'Смесительный узел с сервоприводом FB-MU80-16 HW-25',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 24,
    name: 'Смесительный узел с сервоприводом FB-MU110-25 HW-32',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 25,
    name: 'Смесительный узел с сервоприводом FB-MU120-40 HW-40',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 26,
    name: 'Смесительный узел с сервоприводом FB-MU60-63 HW-50',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 27,
    name: 'Смесительный узел с сервоприводом FB-MU120-63 HW-50',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 28,
    name: 'Смесительный узел с сервоприводом FB-MU150-90 HW-65',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 29,
    name: 'Смесительный узел с сервоприводом FB-MU120-16 HW-25',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 30,
    name: 'Смесительный узел с сервоприводом FB-MU120-25 HW-32',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 31,
    name: 'Смесительный узел с сервоприводом FB-MU150-150 HW-80',
    imgs: [
      'Смесительный узел.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 32,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C2.5-20',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 33,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C4.0-20',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 34,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C6.3-25',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 35,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C10.0-25',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 36,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C16.0-32',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 37,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C25.0-40',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 38,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C40.0-50',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 39,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C60.0-50',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 40,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C90.0-65',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 41,
    name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C150.0-65',
    imgs: [
      'привод калорифера.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 42,
    name: 'Смесительный узел гликолиевого рекуператора с сервоприводом FB-MU120-16G-32',
    imgs: [
      'смес узел глюкол рек.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 43,
    name: 'Смесительный узел гликолиевого рекуператора с сервоприводом FB-MU120-25G-40',
    imgs: [
      'смес узел глюкол рек.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 44,
    name: 'Привод с пружинным возвратом 5Нм 24В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 45,
    name: 'Привод Lufberg DA05S220S',
    imgs: [
      'Привод S.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 46,
    name: 'Привод с пружинным возвратом 5Нм 24В(откр/закр)',
    imgs: [
      'привод с пружинным возвратом.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 47,
    name: 'Привод с пружинным возвратом 5Нм 220В(откр/закр)',
    imgs: [
      'привод с пружинным возвратом.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 48,
    name: 'Привод Lufberg DA05S24S',
    imgs: [
      'Привод S.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 49,
    name: 'Привод без пружинного возврата 4Нм 24В(2/3поз)',
    imgs: [
      'Привод без возвратной пружины.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 50,
    name: 'Привод без пружинного возврата 4Нм 24В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 51,
    name: 'Привод без пружинного возврата 4Нм 220В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 52,
    name: 'Привод без пружинного возврата 4Нм 220В(2/3поз)',
    imgs: [
      'Привод без возвратной пружины.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 53,
    name: 'Привод без пружинного возврата 8Нм 24В(2/3поз)',
    imgs: [
      'Привод без возвратной пружины.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 54,
    name: 'Привод без пружинного возврата 8Нм 220В(2/3поз)',
    imgs: [
      'Привод без возвратной пружины.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 55,
    name: 'Привод без пружинного возврата 8Нм 24В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 56,
    name: 'Привод без пружинного возврата 8Нм 220В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 57,
    name: 'Привод с пружинным возвратом 10Нм 220В(откр/закр)',
    imgs: [
      'привод с пружинным возвратом.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 58,
    name: 'Привод с пружинным возвратом 10Нм 24В(откр/закр)',
    imgs: [
      'привод с пружинным возвратом.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 59,
    name: 'Привод с пружинным возвратом 10Нм 24В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 60,
    name: 'Привод Lufberg DA10S220S',
    imgs: [
      'Привод S.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 61,
    name: 'Привод с пружинным возвратом 15Нм 220В(откр/закр)',
    imgs: [
      'привод с пружинным возвратом.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 62,
    name: 'Привод с пружинным возвратом 15Нм 24В(откр/закр)',
    imgs: [
      'привод с пружинным возвратом.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 63,
    name: 'Привод с пружинным возвратом 15Нм 24В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 64,
    name: 'Привод Lufberg DA15S220S',
    imgs: [
      'Привод S.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 65,
    name: 'Привод без пружинного возврата 16Нм 220В(2/3поз)',
    imgs: [
      'Привод без возвратной пружины.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 66,
    name: 'Привод без пружинного возврата 16Нм 24В(2/3поз)',
    imgs: [
      'Привод без возвратной пружины.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 67,
    name: 'Привод без пружинного возврата 16Нм 24В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 68,
    name: 'Привод без пружинного возврата 16Нм 220В(0-10В)',
    imgs: [
      'Привод 0-10В.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 69,
    name: '0.55 кВт',
    imgs: [
      'двигатель 0,55 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 70,
    name: '0.75 кВт',
    imgs: [
      'двигатель 0,75 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 71,
    name: '1.1 кВт',
    imgs: [
      'двигатель 1.1 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 72,
    name: '1.5 кВт',
    imgs: [
      'двигатель 1.5 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 73,
    name: '2.2 кВт',
    imgs: [
      'двигатель 2.2 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 74,
    name: '3.0 кВт',
    imgs: [
      'Двигатель 3 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 75,
    name: '4.0 кВт',
    imgs: [
      'двигатель 4 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 76,
    name: '5.5 кВт',
    imgs: [
      'двигатель 5.5 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 77,
    name: '7.5 кВт',
    imgs: [
      'двигатель 7,5 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 78,
    name: '11.0 кВт',
    imgs: [
      'двигатеоь 11 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 79,
    name: '15.0 кВт',
    imgs: [
      'двигатель 15 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 80,
    name: '18.5 кВт',
    imgs: [
      'двигатель 18,5 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 81,
    name: '22 кВт',
    imgs: [
      'двигатель 22 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 82,
    name: '30.0 кВт',
    imgs: [
      'двигатель 30 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: '',
  },
  {
    id: 83,
    name: 'ЧП, 1 ф., ~230В, 0.4 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 84,
    name: '0.55 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 85,
    name: 'ЧП, 3 ф., ~380-480В, 0.75 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 86,
    name: '1.1 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 87,
    name: 'ЧП, 3 ф., ~380-480В, 1.5 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 88,
    name: 'ЧП, 3 ф., ~380-480В, 2.2 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 89,
    name: '3.0 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 90,
    name: 'ЧП, 3 ф., ~380-480В, 4.0 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 91,
    name: 'ЧП, 3 ф., ~380-480В, 5.5 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 92,
    name: 'ЧП, 3 ф., ~380-480В, 7.5 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 93,
    name: 'ЧП, 3 ф., ~380-480В, 11.0 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 94,
    name: 'ЧП, 3 ф., ~380-480В, 15.0 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 95,
    name: 'ЧП, 3 ф., ~380-480В, 18.5 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 96,
    name: 'Частотный преобразователь 22kW - 150% / 30kW - 120%, питание 380V AC, 50Hz, выход 3~380V AC, 0.1-400Hz',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 97,
    name: 'ЧП, 3 ф., ~380-480В, 30.0 кВт',
    imgs: [
      'частотный преобразователь.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 4,
    link: '',
  },
  {
    id: 98,
    name: 'FB-CK 100',
    imgs: [
      'двигатель 0,06.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 99,
    name: 'FB-CK 125',
    imgs: [
      'двигатель 0,071.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 100,
    name: 'FB-CK 160',
    imgs: [
      'двигатель 0,75 кВт.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 101,
    name: 'FB-CK 200',
    imgs: [
      'двигатель 0,105.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 102,
    name: 'FB-CK 250',
    imgs: [
      'двигатель 0,157.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 103,
    name: 'FB-CK 315',
    imgs: [
      'двигатель 0,295.jpg',
    ],
    comment: 'данные с раздела Вентилятор',
    priority: 2,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 104,
    name: 'Блок Твердотельного Реле 2',
    imgs: [
      'БТР.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 105,
    name: 'Блок Твердотельного Реле 1',
    imgs: [
      'БТР.jpg',
    ],
    comment: 'Данные с раздела автоматика',
    priority: 5,
    link: '',
  },
  {
    id: 106,
    name: '0.4 кВт',
    imgs: [
      '0,4 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 107,
    name: '0.6 кВт',
    imgs: [
      '0,6 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
  },
  {
    id: 108,
    name: '1.2 кВт',
    imgs: [
      '1,2 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-02',
  },
  {
    id: 109,
    name: '1.8 кВт',
    imgs: [
      '1,8 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-03',
  },
  {
    id: 110,
    name: '2.2 кВт',
    imgs: [
      '2,2 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-04',
  },
  {
    id: 111,
    name: '3 кВт',
    imgs: [
      '3,0 кВт 220.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-05',
  },
  {
    id: 112,
    name: '5х2 кВт',
    imgs: [
      '5 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-06',
  },
  {
    id: 113,
    name: '6 кВт',
    imgs: [
      '6 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-07',
  },
  {
    id: 114,
    name: '9 кВт',
    imgs: [
      '9 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-08',
  },
  {
    id: 115,
    name: '12 кВт',
    imgs: [
      '12 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-09',
  },
  {
    id: 116,
    name: '15 кВт',
    imgs: [
      '15 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-10',
  },
  {
    id: 117,
    name: '17 кВт',
    imgs: [
      '17 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-11',
  },
  {
    id: 118,
    name: '22 кВт',
    imgs: [
      '22,5 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-12',
  },
  {
    id: 119,
    name: '27 кВт',
    imgs: [
      '27 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-13',
  },
  {
    id: 120,
    name: '32 кВт',
    imgs: [
      '32 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-14',
  },
  {
    id: 121,
    name: '45 кВт',
    imgs: [
      '45кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-15',
  },
  {
    id: 122,
    name: '56 кВт',
    imgs: [
      '56 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-16',
  },
  {
    id: 123,
    name: '67 кВт',
    imgs: [
      '67 кВ.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-17',
  },
  {
    id: 124,
    name: '90 кВт',
    imgs: [
      '90 кВ.jpg',
      'защита для эл нагрева.jpg',
    ],
    comment: '',
    priority: 3,
    link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-18',
  },
  {
    id: 125,
    name: 'Ввод 220',
    imgs: [
      'ввод 220.jpg',
    ],
    comment: 'Добавляется если применяется строки 87-92 и 95-99',
    priority: 1,
    link: '',
  },
  {
    id: 126,
    name: 'Ввод 380',
    imgs: [
      'Ввод 380В.jpg',
    ],
    comment: 'Добавляется во всех случаях,кроме когда используется строка 127 (Ввод 220В)',
    priority: 1,
    link: '',
  },
  {
    id: 127,
    name: 'Пожарный сигнал',
    imgs: [
      'пожарный сигнал.jpg',
    ],
    comment: 'Добавляется в каждую схему',
    priority: 1,
    link: '',
  },
  {
    id: 128,
    name: 'ККБ',
    imgs: [
      'Group 2.jpg',
    ],
    comment: 'В элементах автоматики',
    priority: 1,
    link: '',
  },
  {
    id: 129,
    name: 'Увлажниетель сотовый',
    imgs: [
      'Увлажнитель адиабатный.jpg',
    ],
    comment: '',
    priority: 1,
    link: '',
  },
  {
    id: 130,
    name: 'Увлажниетель паровой',
    imgs: [
      'Паровой увлажнитель.jpg',
    ],
    comment: '',
    priority: 1,
    link: '',
  },
]