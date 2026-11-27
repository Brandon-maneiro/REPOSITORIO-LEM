const input = document.querySelector('#rangeInput');
const inputNumber = document.querySelector('.inputNumber');

const base = document.querySelector('.numBase');
const expoente = document.querySelector('.expoente');
const resultado = document.querySelector('.resultado');

let centerValue = input.getAttribute('max') / 2;

let initialValue = inputNumber.value;

let mouseDown = false;

function calcularResultado() {
  let total = 0;

  total = initialValue * 10 ** (input.value - centerValue);

  if (total < 0.1) {
    total = initialValue / 10 ** Math.abs(input.value - centerValue);
  };

  resultado.innerHTML = total.toLocaleString('pt-br', {maximumSignificantDigits: 15});
}

input.oninput = () => {
    expoente.innerHTML = input.value - centerValue;
    calcularResultado()
}

inputNumber.oninput = () => {
  initialValue = inputNumber.value.replace(',', '.');
  calcularResultado();
};
