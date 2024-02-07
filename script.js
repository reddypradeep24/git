function insert(num) {
    var textview = document.form1.textview;
    var lastChar = textview.value.slice(-1); // Get the last character in the input

    // Check if the last character is an operator and the new character is also an operator
    if (isOperator(lastChar) && isOperator(num)) {
        textview.value = 'undefined';
    } else {
        textview.value = textview.value + num;
    }
}

// Function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

/*function insert(num) {
    document.form1.textview.value = document.form1.textview.value + num;  
}*/

function equal() {
    var exp = document.form1.textview.value;  
    if(exp) {  
        document.form1.textview.value = eval(exp);  
    }  
}

function backspace() {
    var exp = document.form1.textview.value;  
    document.form1.textview.value = exp.substring(0, exp.length - 1);  
}

function clearInput() {
    document.form1.textview.value = '';
}
let currentInput = '';
let operator = '';
let firstOperand = '';

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        document.getElementById('input').value = currentInput;
    }
}

function setOperator(op) {
    if (currentInput !== '') {
        // Check if there's already an operator and calculate the intermediate result if needed
        if (operator !== '') {
            calculate();
        }
        operator = op;
        firstOperand = currentInput;
        currentInput = '';
    }
}

function clearCalculator() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    document.getElementById('input').value = '';
    document.getElementById('output').value = '';
}

function calculate() {
    let result;
    const secondOperand = currentInput;
    if (operator === '+') {
        result = parseFloat(firstOperand) + parseFloat(secondOperand);
    } else if (operator === '-') {
        result = parseFloat(firstOperand) - parseFloat(secondOperand);
    } else if (operator === '*') {
        result = parseFloat(firstOperand) * parseFloat(secondOperand);
    } else if (operator === '/') {
        if (parseFloat(secondOperand) === 0) {
            alert("Error: Division by zero!");
            clearCalculator();
            return;
        } else {
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
        }
    }
    // Update the first operand and operator for potential chaining
    firstOperand = result;
    operator = '';
    currentInput = '';
    document.getElementById('output').value = result; // Display the intermediate result
}

function appendToInput(value) {
    // Check if the value is an operator
    if (['+', '-', '*', '/'].includes(value)) {
        // Check if the current input is not empty and if the last character is not an operator
        if (currentInput !== '' && !['+', '-', '*', '/'].includes(currentInput[currentInput.length - 1])) {
            currentInput += value;
            document.getElementById('input').value = currentInput;
        }
    } else {
        currentInput += value;
        document.getElementById('input').value = currentInput;
    }
}

function calculateSquareRoot() {
    const input = parseFloat(document.getElementById('input').value);
    if (input < 0) {
        alert("Error: Cannot calculate square root of a negative number!");
        clearCalculator();
    } else {
        const result = Math.sqrt(input);
        document.getElementById('output').value = result;
    }
}