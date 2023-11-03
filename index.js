javascript:
  var schemeUrl = 'https://raw.githubusercontent.com/shrue348/parser/main/img/';
  var schemes = [
    schemeUrl + 'scheme_1.jpg',
    schemeUrl + 'scheme_2.jpg',
    schemeUrl + 'scheme_3.jpg',
  ];

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
        count: values[2].innerText,
      });
    }
  });

  function main () {
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
    resultIn.style.border = '1px solid #000';
    resultIn.style.marginLeft = '2em';
    result.appendChild(resultIn);

    // resultIn.innerText = JSON.stringify(data);

    var img1 = document.createElement('img');
    img1.src = schemes[0];
    img1.style.width = '7em';
    img1.style.position = 'absolute';
    img1.style.top = '7em';
    img1.style.left = '7em';
    resultIn.appendChild(img1);


    var resultTitle = document.createElement('div');
    resultTitle.innerText = title;
    resultTitle.style.position = 'absolute';
    resultTitle.style.bottom = '-1px';
    resultTitle.style.right = '-1px';
    resultTitle.style.padding = '1em';
    resultTitle.style.border = '1px solid #000';
    resultIn.appendChild(resultTitle);


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
; void 0;