//used for user inputs, also prints result of given equation
const USER_DISPLAY  = document.querySelector(".calculator__display");
const NUMERIC_BUTTONS = document.querySelectorAll(".calculator__numeric-input");
const OPERAND_BUTTONS = document.querySelectorAll(".calculator__operand-input");

const VALID_NUMERIC_INPUTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'];
const VALID_OPERAND_INPUTS = ['+', '-', '*', '/'];
const VALID_END_INPUTS     = ['=', 'Enter', 'C', 'c'];

const MAX_NUM_LENGTH = 11;

let memory    = 0;
let input     = 0;
let old_input = 0;

let is_first_repeat = true;
let selected_operand = VALID_OPERAND_INPUTS[0];

for (let id = 0; id < NUMERIC_BUTTONS.length; id++) {
  NUMERIC_BUTTONS[id].addEventListener("click", () => {
    let value = id + 1;
    if (value === 10) {
      value = 'Backspace';
    }
    appendInput(value);
  })
}

document.addEventListener("keydown", (ev) => {
  if (VALID_NUMERIC_INPUTS.includes(ev.key)) {
    appendInput(ev.key);
  }
  else if (VALID_OPERAND_INPUTS.includes(ev.key)) {
    selectOperation(ev.key);
  }
  else if (VALID_END_INPUTS.includes(ev.key)) {
    if ('C' === ev.key || 'c' === ev.key) {
      resetCalculator()
      return;
    }

    makeOperation();
  }
  // console.log ("Mem = " + memory.toString() + "\nInp = " + input.toString() + "\nOldInp = " + old_input.toString());
})

function doOperation(operand, inp) {
  let res = 0;
  switch (operand) {
    case '+':
      res = memory + inp;
      break;
    case '-':
      res = memory - inp;
      break;
    case '*':
      res = memory * inp;
      break;
    case '/':
      if (inp === 0) {
        res = NaN;
      }
      res = memory / inp;
      let res_len = res.toString().length;
      let len_left = MAX_NUM_LENGTH - res_len;
      if (len_left <= 0) {
        res = res.toPrecision(MAX_NUM_LENGTH);
      }
      break;
  }
  
  if (res.toString().length > MAX_NUM_LENGTH + 1) {
    res = Infinity;
  }
  
  return res;
}

function appendInput(num) {
  if (input !== old_input && !is_first_repeat) {
    let helper = input;
    resetCalculator();
    input = helper;
  }

  if (num === 'Backspace') {
    input = Math.floor(input / 10);
  }
  else if (input.toString().length < MAX_NUM_LENGTH) {
    input = input * 10 + parseInt(num);
  }
  USER_DISPLAY.textContent = input;
}

function selectOperation(oper) {
  memory === 0 ? memory = input : memory = doOperation(selected_operand, input);
  is_first_repeat = true;
  input = 0;
  
  selected_operand = oper;
  USER_DISPLAY.textContent = memory;
}

function makeOperation() {
  if (is_first_repeat) {
    old_input = input;
    input = 0;
    is_first_repeat = false;
  }

  memory = doOperation(selected_operand, old_input);
  USER_DISPLAY.textContent = memory;
}

function resetCalculator() {
  memory    = 0;
  input     = 0;
  old_input = 0;

  selected_operand = '+';
  is_first_repeat = true;

  USER_DISPLAY.textContent = memory;
}