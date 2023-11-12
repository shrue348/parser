var schemeUrl = 'https://raw.githubusercontent.com/shrue348/parser/main/img/';

var body = document.querySelector('body');
var table = document.querySelector('#automatic_table');
var rows = table.querySelectorAll('tr');
var data = [];

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

data = [
  {
    title: 'Щит управления',
    description: 'FBR-SER',
    count: 1,
  },
  {
    title: 'Фильтр. Реле перепада давления PDS',
    description: 'Датчик перепада давления PDS500 (600)',
    count: 2,
  },
  {
    title: 'Смесительный узел',
    description: 'Смесительный узел с сервоприводом FB-MU60-10 HW-25',
    count: 1,
  },
  {
    title: 'Роторный рекуператор. Частотный преобразователь',
    description: 'ЧП, 1 ф., ~230В, 0.4 кВт',
    count: 1,
  },
  {
    title: 'Наружный датчик TMO',
    description: 'Датчик температуры наружный Pt 1000',
    count: 1,
  },
  {
    title: 'Канальный датчик TMD',
    description: 'Датчик температуры канальный Pt1000',
    count: 1,
  },
  {
    title: 'Воздушный клапан.Электропривод',
    description: 'Привод с пружинным возвратом 10Нм 24В(откр/закр)',
    count: 1,
  },
  {
    title: 'Воздушный клапан.Электропривод',
    description: 'Привод без пружинного возврата 4Нм 24В(2/3поз)',
    count: 1,
  },
  {
    title: 'Водяной нагреватель. Термостат защиты от замерзания TF',
    description: 'Термостат защиты от замерзания 3м, TF30,авт.сброс',
    count: 1,
  },
  {
    title: 'Водяной нагреватель. Накладной датчик TMS',
    description: 'Накладной датчик температуры Pt 1000',
    count: 1,
  },
  {
    title: 'Вентилятор. Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 1.5 кВт',
    count: 2,
  },
  {
    title: 'Переключатель',
    description: 'Переключатель двухпозиционный OFF-ON/ON-OFF',
    count: 1,
  },
  {
    title: 'Переключатель',
    description: 'Переключатель двухпозиционный OFF-ON/ON-OFF с сигнальными лампами',
    count: 1,
  },
  {
    title: 'Пульт управление',
    description: 'Панель управления ПУ-3',
    count: 1,
  },
  {
    title: 'Регулятор скорости',
    description: 'Регулятор скорости круглого канального вентилятора 220В',
    count: 1,
  },
  {
    title: 'Датчик',
    description: 'Комнатный преобразователь CO2 и температуры',
    count: 1,
  },
  {
    title: 'Датчик',
    description: 'Комнатный преобразователь влажности и температуры',
    count: 1,
  },
  {
    title: 'Датчик',
    description: 'Датчик температуры комнатный PT1000',
    count: 1,
  },
  {
    title: 'Датчик',
    description: 'Канальный преобразователь влажности и температуры',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 0.75 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 2.2 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 4.0 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 5.5 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 7.5 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 11.0 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 15.0 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 18.5 кВт',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'Частотный преобразователь 22kW - 150% / 30kW - 120%, питание 380V AC, 50Hz, выход 3~380V AC, 0.1-400Hz',
    count: 1,
  },
  {
    title: 'Частотный преобразователь',
    description: 'ЧП, 3 ф., ~380-480В, 30.0 кВт',
    count: 1,
  }
];

var a = [];

function main(){
  var title = data[0].title + ' ' + data[0].description;

  var result = document.createElement('div');
  result.id = 'RESULT';
    // result.style.position = 'absolute';
    // result.style.margin = 'auto';
    // result.style.bottom = 0;
    // result.style.left = 0;
    // result.style.right = 0;
    // result.style.zIndex = 999;
  result.style.backgroundColor = '#fff';
  result.style.color = '#000';
  result.style.padding = '1em';
  body.appendChild(result);

  var resultIn = document.createElement('div');
  resultIn.style.position = 'relative';
  resultIn.style.width = '71.5em';
  resultIn.style.height = '55.5em';
  resultIn.style.boxSizing = 'border-box';
  resultIn.style.border = '1px solid #000';
  resultIn.style.marginLeft = '2em';
  resultIn.style.display = 'flex';
  resultIn.style.flexWrap = 'wrap';
  resultIn.style.alignItems = 'flex-start';
  resultIn.style.justifyContent = 'space-evenly';
  resultIn.style.padding = '5em';
  result.appendChild(resultIn);

  var resultTitle = document.createElement('div');
  resultTitle.innerText = title;
  resultTitle.style.fontStyle = 'italic';
  resultTitle.style.position = 'absolute';
  resultTitle.style.bottom = '-1px';
  resultTitle.style.right = '-1px';
  resultTitle.style.padding = '1em';
  resultTitle.style.border = '1px solid #000';
  resultIn.appendChild(resultTitle);


  function createImage(img){
    var el = document.createElement('img');
    el.src = schemeUrl + img;
    el.style.width = '7em';
    // el.style.position = 'absolute';
    el.style.top = '7em';
    el.style.left = '7em';
    resultIn.appendChild(el);
  }

  // var img1 = document.createElement('img');
  // img1.style.width = '7em';
  // img1.style.position = 'absolute';
  // img1.style.top = '7em';
  // img1.style.left = '7em';
  // resultIn.appendChild(img1);

  // var resultTitle2 = document.createElement('div');
  // resultTitle2.innerText = 'iejfowiejfoiwe';
  // resultTitle2.style.fontStyle = 'italic';
  // resultTitle2.style.position = 'absolute';
  // resultTitle2.style.bottom = '-1px';
  // resultTitle2.style.left = '0';
  // resultTitle2.style.transformOrigin = '0 100%';
  // resultTitle2.style.transform = 'rotateZ(-90deg)';
  // resultTitle2.style.padding = '.2em 1em';
  // resultTitle2.style.border = '1px solid #000';
  // resultIn.appendChild(resultTitle2);

  data.forEach(function(el) {
    var dataObj = arr.find(function(dataEl){
      return dataEl.name == el.description
    });


    if (dataObj) {
      console.log('arr', dataObj);
      dataObj.imgs.forEach(createImage);
    }
  });

  var opt = {
    margin: 0,
    filename: title + '.pdf',
    image: { type: 'jpg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

  html2pdf().set(opt).from(document.querySelector('#RESULT')).save();
  result.remove();
}

var htmlToPdf = document.createElement('script');
htmlToPdf.id = 'HTML2PDF';
htmlToPdf.async = true;
htmlToPdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
htmlToPdf.onload = main;
body.appendChild(htmlToPdf);


var arr = [
	{
		name: 'Датчик перепада давления PDS500 (600)',
		imgs: [
      'Датчик перепада давления.jpg'
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Датчик температуры канальный Pt1000',
		imgs: [
      'Канальный датчик.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Датчик температуры наружный Pt 1000',
		imgs: [
      'Наружный датчик.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Термостат защиты от замерзания 3м, TF30,авт.сброс',
		imgs: [
      'Термостат.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Термостат защиты от замерзания 6м, TF30,авт.сброс',
		imgs: [
      'Термостат.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Термостат защиты от замерзания 11,5м, TF30,авт.сброс',
		imgs: [
      'Термостат.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Накладной датчик температуры Pt 1000',
		imgs: [
      'датчик обратной воды.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Переключатель двухпозиционный OFF-ON/ON-OFF',
		imgs: [],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Переключатель двухпозиционный OFF-ON/ON-OFF с сигнальными лампами',
		imgs: [
      'Местный выключатель.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Панель управления ПУ-3',
		imgs: [
      'ПУ3.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Регулятор скорости круглого канального вентилятора 220В',
		imgs: [
      'СБ033.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Регулятор скорости 1.5',
		imgs: [
      'Симисторный регулятор.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Датчик температуры комнатный PT1000 ',
		imgs: [
      'Комнатный датчик.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Канальный преобразователь влажности и температуры ',
		imgs: [
      'Датчик влажности.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU40-1.6 HW-15',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU40-2.5 HW-15',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU40-4.0 HW-20',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU60-4.0 HW-20',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU60-6.3 HW-20',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU60-10 HW-25',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU80-6.3 HW-20',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU80-10 HW-25',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU80-16 HW-25',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU110-25 HW-32',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU120-40 HW-40',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU60-63 HW-50',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU120-63 HW-50',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU150-90 HW-65',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU120-16 HW-25',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU120-25 HW-32',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел с сервоприводом FB-MU150-150 HW-80',
		imgs: [
      'Смесительный узел.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C2.5-20',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C4.0-20',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C6.3-25',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C10.0-25',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C16.0-32',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C25.0-40',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C40.0-50',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C60.0-50',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C90.0-65',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел водяного охладителя с сервоприводом FB-MU-C150.0-65',
		imgs: [
      'привод калорифера.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел гликолиевого рекуператора с сервоприводом FB-MU120-16G-32',
		imgs: [
      'смес узел глюкол рек.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Смесительный узел гликолиевого рекуператора с сервоприводом FB-MU120-25G-40',
		imgs: [
      'смес узел глюкол рек.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 5Нм 24В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод Lufberg DA05S220S',
		imgs: [
      'Привод S.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 5Нм 24В(откр/закр)',
		imgs: [
      'привод с пружинным возвратом.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 5Нм 220В(откр/закр)',
		imgs: [
      'привод с пружинным возвратом.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод Lufberg DA05S24S',
		imgs: [
      'Привод S.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 4Нм 24В(2/3поз)',
		imgs: [
      'Привод без возвратной пружины.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 4Нм 24В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 4Нм 220В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 4Нм 220В(2/3поз)',
		imgs: [
      'Привод без возвратной пружины.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 8Нм 24В(2/3поз)',
		imgs: [
      'Привод без возвратной пружины.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 8Нм 220В(2/3поз)',
		imgs: [
      'Привод без возвратной пружины.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 8Нм 24В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 8Нм 220В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 10Нм 220В(откр/закр)',
		imgs: [
      'привод с пружинным возвратом.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 10Нм 24В(откр/закр)',
		imgs: [
      'привод с пружинным возвратом.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 10Нм 24В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод Lufberg DA10S220S',
		imgs: [
      'Привод S.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 15Нм 220В(откр/закр)',
		imgs: [
      'привод с пружинным возвратом.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 15Нм 24В(откр/закр)',
		imgs: [
      'привод с пружинным возвратом.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод с пружинным возвратом 15Нм 24В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод Lufberg DA15S220S',
		imgs: [
      'Привод S.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 16Нм 220В(2/3поз)',
		imgs: [
      'Привод без возвратной пружины.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 16Нм 24В(2/3поз)',
		imgs: [
      'Привод без возвратной пружины.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 16Нм 24В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Привод без пружинного возврата 16Нм 220В(0-10В)',
		imgs: [
      'Привод 0-10В.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: '0.55 кВт',
		imgs: [
      'двигатель 0,55 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '0.75 кВт',
		imgs: [
      'двигатель 0,75 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '1.1 кВт',
		imgs: [
      'двигатель 1.1 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '1.5 кВт',
		imgs: [
      'двигатель 1.5 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '2.2 кВт',
		imgs: [
      'двигатель 2.2 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '3.0 кВт',
		imgs: [
      'Двигатель 3 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '4.0 кВт',
		imgs: [
      'двигатель 4 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '5.5 кВт',
		imgs: [
      'двигатель 5.5 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '7.5 кВт',
		imgs: [
      'двигатель 7,5 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '11.0 кВт',
		imgs: [
      'двигатеоь 11 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '15.0 кВт',
		imgs: [
      'двигатель 15 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '18.5 кВт',
		imgs: [
      'двигатель 18,5 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '22 кВт',
		imgs: [
      'двигатель 22 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: '30.0 кВт',
		imgs: [
      'двигатель 30 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: '',
	},
	{
		name: 'ЧП, 1 ф., ~230В, 0.4 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: '0.55 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 0.75 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: '1.1 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 1.5 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 2.2 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: '3.0 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 4.0 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 5.5 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 7.5 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 11.0 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 15.0 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 18.5 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'Частотный преобразователь 22kW - 150% / 30kW - 120%, питание 380V AC, 50Hz, выход 3~380V AC, 0.1-400Hz',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'ЧП, 3 ф., ~380-480В, 30.0 кВт',
		imgs: [
      'частотный преобразователь.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 4,
		link: '',
	},
	{
		name: 'FB-CK 100',
		imgs: [
      'двигатель 0,06.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: 'FB-CK 125',
		imgs: [
      'двигатель 0,071.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: 'FB-CK 160',
		imgs: [
      'двигатель 0,75 кВт.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: 'FB-CK 200',
		imgs: [
      'двигатель 0,105.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: 'FB-CK 250',
		imgs: [
      'двигатель 0,157.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: 'FB-CK 315',
		imgs: [
      'двигатель 0,295.jpg',
    ],
		comment: 'данные с раздела Вентилятор',
		count: 2,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359691&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: 'Блок Твердотельного Реле 2',
		imgs: [
      'БТР.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: 'Блок Твердотельного Реле 1',
		imgs: [
      'БТР.jpg',
    ],
		comment: 'Данные с раздела автоматика',
		count: 5,
		link: '',
	},
	{
		name: '0.4 кВт',
		imgs: [
      '0,4 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: '0.6 кВт',
		imgs: [
      '0,6 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-01',
	},
	{
		name: '1.2 кВт',
		imgs: [
      '1,2 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-02',
	},
	{
		name: '1.8 кВт',
		imgs: [
      '1,8 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-03',
	},
	{
		name: '2.2 кВт',
		imgs: [
      '2,2 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-04',
	},
	{
		name: '3 кВт',
		imgs: [
      '3,0 кВт 220.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-05',
	},
	{
		name: '5х2 кВт',
		imgs: [
      '5 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-06',
	},
	{
		name: '6 кВт',
		imgs: [
      '6 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-07',
	},
	{
		name: '9 кВт',
		imgs: [
      '9 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-08',
	},
	{
		name: '12 кВт',
		imgs: [
      '12 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-09',
	},
	{
		name: '15 кВт',
		imgs: [
      '15 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-10',
	},
	{
		name: '17 кВт',
		imgs: [
      '17 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-11',
	},
	{
		name: '22 кВт',
		imgs: [
      '22,5 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-12',
	},
	{
		name: '27 кВт',
		imgs: [
      '27 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-13',
	},
	{
		name: '32 кВт',
		imgs: [
      '32 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-14',
	},
	{
		name: '45 кВт',
		imgs: [
      '45кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-15',
	},
	{
		name: '56 кВт',
		imgs: [
      '56 кВт.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-16',
	},
	{
		name: '67 кВт',
		imgs: [
      '67 кВ.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-17',
	},
	{
		name: '90 кВт',
		imgs: [
      '90 кВ.jpg',
      'защита для эл нагрева.jpg',
    ],
		comment: '',
		count: 3,
		link: 'https://fanber.dvaoblaka.ru/main#configuratorId=3359490&amp;filter%5Bkp_id%5D=FB23-008490-01&amp;cardModel=kp&amp;modelId=FB23-008490-18',
	},
	{
		name: 'Ввод 220',
		imgs: [
      'ввод 220.jpg',
    ],
		comment: 'Добавляется если применяется строки 87-92 и 95-99',
		count: 1,
		link: '',
	},
	{
		name: 'Ввод 380',
		imgs: [
      'Ввод 380В.jpg',
    ],
		comment: 'Добавляется во всех случаях,кроме когда используется строка 127 (Ввод 220В)',
		count: 1,
		link: '',
	},
	{
		name: 'Пожарный сигнал',
		imgs: [
      'пожарный сигнал.jpg',
    ],
		comment: 'Добавляется в каждую схему',
		count: 1,
		link: '',
	},
	{
		name: 'ККБ',
		imgs: [
      'Group 2.jpg',
    ],
		comment: 'В элементах автоматики',
		count: 1,
		link: '',
	},
	{
		name: 'Увлажниетель сотовый',
		imgs: [
      'Увлажнитель адиабатный.jpg',
    ],
		comment: '',
		count: 1,
		link: '',
	},
	{
		name: 'Увлажниетель паровой',
		imgs: [
      'Паровой увлажнитель.jpg',
    ],
		comment: '',
		count: 1,
		link: '',
	},
]