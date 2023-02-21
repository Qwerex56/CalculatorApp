//used for user inputs, also prints result of given equation
const USER_DISPLAY  = document.querySelector(".calculator__display");
const CALCULATOR    = document.querySelector(".calculator");

const VALID_NUMERIC_INPUTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const VALID_OPERAND_INPUTS = ['+', '-', '*', '/'];
const VALID_END_INPUTS     = ['equals', 'Enter', 'C', 'c'];

const IS_NUMERIC  = "calculator__input--numeric";
const IS_OPERAND  = "calculator__input--operand";
const IS_ENDPOINT = "calculator__input--endpoint";

const MAX_NUM_LENGTH = 11;

let memory = 0;
let input  = 0;
let result = 0;

let last_input = 0;

let is_first_repeat = true;
let selected_operand = VALID_OPERAND_INPUTS[0];

CALCULATOR.addEventListener("click", (ev) => {
  let elem = ev.target;
  let elem_val = elem.dataset.value;

  if (elem.classList.contains(IS_NUMERIC)) {
    input = appendInput(elem_val);
    USER_DISPLAY.innerText = input;
  }
  if (elem.classList.contains(IS_OPERAND)) {
    selectOperation(elem_val);
    USER_DISPLAY.innerText = memory;
  }
  if (elem.classList.contains(IS_ENDPOINT)) {
    modifyOperation(elem_val);
  }
})

function appendInput(num) {
  let val = input.toString();
  
  if (num === '.' && !val.includes('.')) {
    val = val.concat(num);
  }
  if (num === 'DEL') {
    val = val.substring(0, val.length - 1);
  }
  
  if (VALID_NUMERIC_INPUTS.includes(num)) {
    val = val.concat(num);
  }

  switch (val.charAt(0)) {
    case '0':
      if (val.charAt(1) === '.'){
        break;
      }
      val = val.substring(1);
      break;
    case '.':
      val = '0' + val;
      break;
  }
  if (val.length === 0) {
    val = '0';
  }

  return val;
}

function selectOperation(oper) {
  if (parseFloat(input) !== 0) {
    result = doOperation(selected_operand, memory, input);
    memory = result;
  }

  selected_operand = oper;
  input = 0;
}

function modifyOperation(mod) {
  switch (mod) {
    case 'equals': 
      if (input !== '0') {
        last_input = input;
        input = '0';
      }
      result = doOperation(selected_operand, memory, last_input);
      memory = result;
      USER_DISPLAY.innerText = result;
      break;
    case 'clear':
      resetCalculator()
      break;
    case 'plus-minus':
      input = parseFloat(input);
      input *= -1;
      USER_DISPLAY.innerText = input;
      break;
  }
}

function doOperation(operand, lhs, rhs) {
  let result = 0;
  lhs = parseFloat(lhs);
  rhs = parseFloat(rhs);
  switch (operand) {
    case '+':
      result = lhs + rhs;
      break;
    case '-':
      result = lhs - rhs;
      break;
    case '*':
      result = lhs * rhs;
      break;
    case '/':
      break;
  }
  return result;
}

function resetCalculator() {
  memory    = 0;
  input     = 0;
  result    = 0;
  last_input = 0;

  selected_operand = '+';
  is_first_repeat = true;

  USER_DISPLAY.textContent = memory;
}