javascript:
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
    var result = document.createElement('div');
    result.id = 'RESULT';
    result.style.backgroundColor = '#fff';
    result.style.color = '#000';
    result.style.padding = '1em';
    body.appendChild(result);

    var result2 = document.createElement('div');
    result2.style.position = 'relative';
    result2.style.width = 'relative';
    result2.style.border = '1px solid #000';

    result.appendChild(result2);
    result2.innerText = JSON.stringify(data);


    var opt = {
      margin:       0,
      filename:     data[0].title + '_' + data[0].description + '.pdf',
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
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