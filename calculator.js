let num1, num2, operator, inputValue, result, calcResult, splitResult;
const display = document.querySelector(".display_box");
const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operators");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const ops = ["+", "/", "x", "-"];
const backspace = document.querySelector(".backspace");

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  if (operator === "+") {
    calcResult = add(num1, num2);
  } else if (operator === "-") {
    calcResult = subtract(num1, num2);
  } else if (operator === "x") {
    calcResult = multiply(num1, num2);
  } else if (operator === "/") {
    calcResult = divide(num1, num2);
  }
  return calcResult.toFixed(2);
}

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputValue = display.innerHTML += button.textContent;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      inputValue.includes(operator) &&
      inputValue.split(operator)[1].length > 0
    ) {
      calculate();
    }
    operator = button.textContent;

    inputValue = display.innerHTML += button.textContent;
  });
});

equals.addEventListener("click", () => {
  if (num1 === "" || num1 === undefined) {
    display.innerHTML = "enter Num";
  }
  if (num2 === "" || num2 === undefined) {
    display.innerHTML = "enter Num";
  }

  calculate();
});

function calculate(num1, num2) {
  splitResult = inputValue.split(operator);
  num1 = Number(splitResult[0]);
  num2 = Number(splitResult[1]);

  if (splitResult[1] === "" || splitResult[1] === undefined) {
    display.innerHTML = "enter 2nd Num";
    return;
  }
  if (operator === "/" && num2 === 0) {
    display.innerHTML = "inifinty";
    return;
  }

  result = display.innerHTML = operate(num1, num2, operator);
  return result;
}
clear.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  display.innerHTML = "";
});
