const symbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };

function show(data, url) {
  const box = document.getElementById('result');
  if (data.error) {
    box.className = 'result error';
    box.textContent = 'Error: ' + data.error;
  } else {
    box.className = 'result';
    box.textContent = `${data.a} ${symbols[data.operation]} ${data.b} = ${data.result}`;
  }
  document.getElementById('raw').textContent = url + '\n' + JSON.stringify(data, null, 2);
}

function getCalc(op) {
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const url = `/${op}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;
  fetch(url).then(r => r.json()).then(d => show(d, 'GET ' + url));
}

function postCalc() {
  const body = {
    a: document.getElementById('a').value,
    b: document.getElementById('b').value,
    operation: document.getElementById('op').value,
  };
  fetch('/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(r => r.json())
    .then(d => show(d, 'POST /calculate ' + JSON.stringify(body)));
}
