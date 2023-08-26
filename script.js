//save previous answer

let numberOne = 0;
let numberTwo = 0;
let operator = null;
let shouldResetScreen = false;

const calcScreenAnswer = document.querySelector('h1');
const calcScreenEquation= document.querySelector('h2');

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');

clearButton.addEventListener('click', clear);
equalButton.addEventListener('click', equate);

numberButtons.forEach((button) => button.addEventListener('click',function(){
    attachNumber(button.value);
}));

operatorButtons.forEach((button) => button.addEventListener('click',function(){
    attachOperator(button.value);
}));


function attachNumber(value){
    if(calcScreenAnswer.textContent === '0' || shouldResetScreen === true){
        resetScreen();
    }
    calcScreenAnswer.textContent += value;
};

function attachOperator(value){
    if(operator !== null) equate();
    numberOne = calcScreenAnswer.textContent;
    operator = value;
    calcScreenEquation.textContent = `${numberOne} ${operator}`
    shouldResetScreen = true;
};

function clear(){
    calcScreenEquation.textContent = '';
    calcScreenAnswer.textContent = '';
    numberOne = '';
    numberTwo = '';
    operator = null;
};

function resetScreen(){
    calcScreenAnswer.textContent = '';
    shouldResetScreen = false;
}

function equate(){
    if(calcScreenAnswer === null || shouldResetScreen) return
    if(operator === '/' && calcScreenAnswer.textContent === '0'){
        alert('Error: Divide By 0');
        return
    }
    if(operator === null) return
    numberTwo = calcScreenAnswer.textContent;
    calcScreenAnswer.textContent = roundAnswer(operate(numberOne, numberTwo, operator));
    calcScreenEquation.textContent = `${numberOne} ${operator} ${numberTwo} =`
    operator = null;
    shouldResetScreen = true;
};

function roundAnswer(answer){
    return Math.round(answer * 1000)/1000;
}

function operate(numberOne, numberTwo, operator){
    switch (operator) {
        case "+":
            return add(numberOne, numberTwo);
        case "-":
            return subtract(numberOne, numberTwo);
        case "*":
            return multiply(numberOne, numberTwo);
        case "/":
            return divide(numberOne, numberTwo);            
    }
};

//opertation functions
function add(numberOne, numberTwo){
    return parseInt(numberOne)+parseInt(numberTwo);
};

function subtract(numberOne, numberTwo){
    return numberOne - numberTwo;
};

function multiply(numberOne, numberTwo){
    return numberOne * numberTwo;
};

function divide(numberOne, numberTwo){
    return numberOne / numberTwo;
};