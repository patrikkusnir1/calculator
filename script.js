// Basic functions of calculator
function add(num1, num2 = 0) {
  return num1 + num2
}

function subtract(num1, num2 = 0) {
  return num1 - num2
}

function multiply(num1, num2 = 1) {
  return num1 * num2
}

function divide(num1, num2) {
  return num1 / num2
}

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber)
    case "-":
      return subtract(firstNumber, secondNumber)
    case "*":
      return multiply(firstNumber, secondNumber)
    case "/":
      return divide(firstNumber, secondNumber)
    default: 
      return "Invalid operator"
  }
}

// access DOM elements
const inputBox = document.getElementById("input")
const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");

// Design expression and result variable
let expression = "";
let result = "";
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;


// Define event handler for button click
function buttonClick(event) {
  // Get values from clicked button
  const target = event.target;
  const action = target.dataset.action;
  const value = target.dataset.value;

  // Switch case to control calculator
  switch(action) {
    case "number":
      addValue(value)
      break;
    case "clear": 
      clear();
      break;
    case "backspace":
      backSpace()
      break;
      // add the result to expression as a starting point if expression is empty
    case "addition":
    case "subtraction":
    case "multiplication":
    case "division":
      handleOperator(value);
      break;
    case "submit":
      submit();
      break;
    case "negate":
      negate();
      break;
    case "mod":
      handleOperator("%")
      break;
    case "decimal": 
      decimal(value);
      break;
  }

  updateDisplay(expression, result);
}

function addValue(value) {
    // Reset the display if a result was just shown
  if (shouldResetDisplay) {
    expression = value;
    shouldResetDisplay = false;
  } else {
    expression += value;
  }

   // Build the first or second number depending on whether an operator is pressed

  if ( currentOperator === null) {
    firstNumber += value; // Build the first number if operator isn't pressed yet
  } else {
    secondNumber += value; // Build the second number after the operator
  }



}

function handleOperator(operator) {
  if (firstNumber === "") return;

  if (operator === "%"){
    if (secondNumber !== "") {
      secondNumber = percentage(Number(firstNumber), Number(secondNumber)).toString();
      expression += "%";
    } 
    return;
  }
   else {
    if (secondNumber !== "") {
    // Calculate result if we already have a second number
    result = operate(Number(firstNumber), currentOperator, Number(secondNumber));
    firstNumber = result.toString();
    secondNumber = "";
  }
  currentOperator = operator;
  expression += `${operator}`;
  updateDisplay(expression, result)
  }

}

function updateDisplay(expression, result) {
  expressionDiv.textContent = expression; //  // Shows the ongoing expression (before clicking `=`)
  if (!shouldResetDisplay) {
    resultDiv.textContent = "";
  } 
}

function clear() {
  expression = "";
  result = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function backSpace() {
  expression = expression.slice(0, -1);
  if (currentOperator === null) {
    firstNumber = firstNumber.slice(0, -1)
  } else {
    secondNumber = secondNumber.slice(0, -1)
  }
}

function submit() {
  if (firstNumber !== "" && currentOperator != null && secondNumber !== "") {
    if (currentOperator === "%") {
      result = percentage(Number(firstNumber), Number(secondNumber))
    }
    else {
      result = operate(Number(firstNumber), currentOperator, Number(secondNumber));
    }

    result = Math.round(result * 100) / 100;
    // Keep the full expression in the expressionDiv
    expressionDiv.textContent = `${firstNumber} ${currentOperator} ${secondNumber}`;
    resultDiv.textContent = result;

    firstNumber = result.toString();
    secondNumber = "";
    currentOperator = null;
    shouldResetDisplay = true;
  } else if (firstNumber !== "" && currentOperator !== null && secondNumber === "") {
    result = "Error: Missing second number"
  }
}

// event listener 
inputBox.addEventListener("click", buttonClick)

function negate() {
  // negate the result if expression is empty and result is present
  if (expression === "" && result !== "") {
    result = -result
    // toggle the sign of expression if it is not already negative and it is not empty 
  } else if (!expression.startsWith("-") && expression !== "") {
    expression = "-" + expression;
    // remove the negative sign if it is already negative
  } else if (expression.startsWith("-")) {
    expression = expression.slice(1);
  }
}

function percentage(num1, num2) {
  return (num1 * num2) / 100
}

function decimal() {
  if (currentOperator === null) {
    // If no operator is pressed yet, check firstNumber
    if (!firstNumber.includes(".")) {
      firstNumber += ".";
      expression += "."
    }
      } else {
        if (!secondNumber.includes(".")) {
          secondNumber += ".";
          expression += "."
        }
      }
    updateDisplay(expression, result)
    }