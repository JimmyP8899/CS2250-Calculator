window.onload = function () {
  clearText();
};

var result = 0; 
var isNewCalculation = true; 
var previousResult = 0; 

function storeVar(value) {
  var textElement = document.getElementById("text");

  if (isNewCalculation) {
    if (previousResult !== 0){
      textElement.innerHTML = previousResult;
    } else {
      textElement.innerHTML = "";
    }

      isNewCalculation = false;
  }

  if (value === '=') {
      calculate();
  } else if (textElement.innerHTML.length < 9){
      textElement.innerHTML += value;
  }
}

function calculate() {
  var textElement = document.getElementById("text");
  var expression = textElement.innerHTML;

    var newResult = parseExpression(expression);
    textElement.innerHTML = newResult.toFixed(2);
    isNewCalculation = true; 
    previousResult = newResult;

}

function clearText() {
  var textElement = document.getElementById("text");
  textElement.innerHTML = "";
  isNewCalculation = true; 
  previousResult = 0;
}

function parseExpression(expression) {
  var tokens = expression.split('');
  var operators = [];
  var numbers = [];

  for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (isOperator(token)) {
          while (
              operators.length > 0 &&
              precedence(token) <= precedence(operators[operators.length - 1])
          ) {
              evaluateLastOperator(operators, numbers);
          }
          operators.push(token);
      } else if (!isNaN(parseFloat(token))) {
          var number = parseFloat(token);
          while (i + 1 < tokens.length && !isNaN(parseFloat(tokens[i + 1]))) {
              number = number * 10 + parseFloat(tokens[i + 1]);
              i++;
          }
          numbers.push(number);
      }
  }

  while (operators.length > 0) {
      evaluateLastOperator(operators, numbers);
  }

  var newResult = numbers.pop();
  return newResult;
}

function isOperator(token) {
  return token === '+' || token === '-' || token === '*' || token === '/';
}

function precedence(operator) {
  if (operator === '+' || operator === '-') {
      return 1;
  } else if (operator === '*' || operator === '/') {
      return 2;
  }
  return 0;
}

function evaluateLastOperator(operators, numbers) {
  var operator = operators.pop();
  var num2 = numbers.pop();
  var num1 = numbers.pop();

  switch (operator) {
      case '+':
          numbers.push(num1 + num2);
          break;
      case '-':
          numbers.push(num1 - num2);
          break;
      case '*':
          numbers.push(num1 * num2);
          break;
      case '/':
          if (num2 === 0) {
              throw "Division by zero";
          }
          numbers.push(num1 / num2);
          break;
  }
}
