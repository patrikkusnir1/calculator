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
const numbers = document.querySelectorAll(".numbers div");
const operators = document.querySelectorAll(".operators div, .equal");
const input = document.querySelector(".display");
const clear = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal")
let displayValue = "0"
let firstNumber = "";
let currentOperator = "";
let secondNumber = "";
let result = null;
let shouldResetDisplay = false;
let decimalAdded = false;


// Event listener for numbers
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (shouldResetDisplay) {
      displayValue = "";
      shouldResetDisplay = false;
    }
    if (number === ".") {
      number.classList.add("disabled")
    }
      if (currentOperator ==="") {
        // concatanate digits for first number
      firstNumber += event.target.innerText;
      input.innerHTML = firstNumber;
      console.log("First number: ", firstNumber)
  } else { 
    // concatanate digits for second number
      secondNumber += event.target.innerText;
      input.innerHTML = secondNumber;
      console.log("Second number:", secondNumber)
  }
});
})
// event listeners for decimal point 
decimalButton.addEventListener("click", () => {
  if (!decimalAdded) {
    if (currentOperator === "") {
      firstNumber += ".";
      input.innerHTML = firstNumber;
    } else {
      secondNumber += ".";
      input.innerHTML = secondNumber
    }
    decimalAdded = true;
  }})

// event listeners for operators

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    const operatorClicked = event.target.innerText;
    if (operatorClicked !== "=") {
      if (firstNumber !== "" && secondNumber !== "") {
        if (currentOperator === "/" && secondNumber ==- "0") {
          result = "Error, dividing by zero is not possible";
          input.innerHTML = result;
          console.log(result)
          // reset the calculator
          firstNumber = "";
          currentOperator = "";
          secondNumber = "";
          return;
        }
        result = operate(Number(firstNumber), currentOperator, Number(secondNumber));
        input.innerHTML = result;
        console.log(result)

         // Prepare to use the result for the next calculation
         firstNumber = result.toString();
         secondNumber = "";
         shouldResetDisplay = true;
      }
      currentOperator = operatorClicked // asign the operator

      console.log("Operator: ", currentOperator)
      decimalAdded = false
    } else { 
      // if pressed =, perform the final calculation
    
    if (firstNumber !== "" && secondNumber !== "") {
      if (currentOperator === "/" && secondNumber ==- "0") {
          result = "Error, dividing by zero is not possible";
          input.innerHTML = result;
          console.log(result)
          // reset the calculator
          firstNumber = "";
          currentOperator = "";
          secondNumber = "";
          return;
      }
      result = operate(Number(firstNumber), currentOperator, Number(secondNumber))
      result = Math.round(result * 100) / 100;
      input.innerHTML = result;
      console.log("Final result:", result)

      // reset firstNumber , operator, secondNumber
      firstNumber = result.toString();
      currentOperator = "";
      secondNumber = "";
      shouldResetDisplay = true;
      decimalAdded = false
      }
    }
  });
})

clear.addEventListener("click", () => {
  firstNumber = "";
  currentOperator = "";
  secondNumber = "";
  input.innerHTML = "";
  console.log("Cleared")
  decimalAdded = false
})

  // let buttonNumber = button.textContent;
  
  // input.textContent += buttonNumber;
  // let value = input.textContent;
  // input.style.border = "1px solid #256";
  // input.style.width = "50%"




// document.querySelector(".preview").innerHTML = operate(5, "-", 10)