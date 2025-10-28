let inputValue = "";
let operator = "";
let history = [];

const display = document.querySelector(".display_box");
const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operators");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const historyList = document.querySelector(".history_list");

// Utility functions
function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) { return num2 !== 0 ? num1 / num2 : "Infinity"; }

function operate(num1, num2, operator) {
  let result;
  switch (operator) {
    case "+": result = add(num1, num2); break;
    case "-": result = subtract(num1, num2); break;
    case "x": result = multiply(num1, num2); break;
    case "/": result = divide(num1, num2); break;
    default: result = "Error";
  }
  return isNaN(result) ? "Error" : parseFloat(result).toFixed(2);
}

// Update display
function updateDisplay() {
  display.textContent = inputValue;
}

// Add to history
function addToHistory(expression, result) {
  history.unshift(`${expression} = ${result}`);
  if (history.length > 5) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Button animation
function animateButton(button) {
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 150);
}

// Digit and decimal input
digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    animateButton(button);
    if (button.textContent === "." && inputValue.includes(".")) return;
    inputValue += button.textContent;
    updateDisplay();
  });
});

// Operator input
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    animateButton(button);
    if (inputValue && !/[+\-x\/]$/.test(inputValue)) {
      inputValue += button.textContent;
      operator = button.textContent;
      updateDisplay();
    }
  });
});

// Equals button
equals.addEventListener("click", () => {
  animateButton(equals);
  let [num1, num2] = inputValue.split(operator);
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (isNaN(num1) || isNaN(num2)) {
    display.textContent = "Error";
    return;
  }
  let result = operate(num1, num2, operator);
  addToHistory(inputValue, result);
  inputValue = result.toString();
  updateDisplay();
});

// Clear button
clear.addEventListener("click", () => {
  animateButton(clear);
  inputValue = "";
  operator = "";
  updateDisplay();
});

// Backspace button
backspace.addEventListener("click", () => {
  animateButton(backspace);
  inputValue = inputValue.slice(0, -1);
  updateDisplay();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (/
\d/.test(e.key)) {
    inputValue += e.key;
    updateDisplay();
  } else if (["+", "-", "x", "/", "*"].includes(e.key)) {
    if (e.key === "*") inputValue += "x";
    else inputValue += e.key;
    operator = e.key === "*" ? "x" : e.key;
    updateDisplay();
  } else if (e.key === ".") {
    if (!inputValue.includes(".")) {
      inputValue += ".";
      updateDisplay();
    }
  } else if (e.key === "Enter" || e.key === "=") {
    equals.click();
  } else if (e.key === "Backspace") {
    backspace.click();
  } else if (e.key === "c" || e.key === "C") {
    clear.click();
  }
});

// Initial render
updateDisplay();
renderHistory();
