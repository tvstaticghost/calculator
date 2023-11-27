const num = document.querySelectorAll('.number');
const operand = document.querySelectorAll('.operand');
const equals = document.getElementById('equals');
const clearBtn = document.getElementById('clear');
const negativeBtn = document.getElementById('negative');
const decimal = document.getElementById('decimal');
const backspaceBtn = document.getElementById('delete');
const ceBtn = document.getElementById('clear-entry');
const screen = document.getElementById('screen');

equals.addEventListener('click', operate);
clearBtn.addEventListener('click', clear);
negativeBtn.addEventListener('click', negative);
backspaceBtn.addEventListener('click', backspace);
ceBtn.addEventListener('click', ce);

num.forEach(function (num) {
    num.addEventListener('click', updateNumber);
});

operand.forEach(function (operand) {
    operand.addEventListener('click', updateOperand);
});

const storage = {
    num1: '',
    operand: '',
    num2: ''
};

function updateNumber() {
    if (storage.operand === '') {
        if (this.textContent === '.') {
            if (storage.num1.includes('.')) {
                screen.textContent = screen.textContent;
            }
            else {
                screen.textContent += this.textContent;
                storage.num1 += this.textContent;
            }
        }
        else {
            storage.num1 += this.textContent;
            screen.textContent += this.textContent;
        }
    }
    else {
        if (this.textContent === '.') {
            if (storage.num2.includes('.')) {
                screen.textContent = screen.textContent;
            }
            else {
                screen.textContent += this.textContent;
                storage.num2 += this.textContent;
            }
        }
        else {
            storage.num2 += this.textContent;
            screen.textContent += this.textContent;
        }
        
    }

    console.log(storage.num1 + " " + storage.operand + " " + storage.num2);
}

function updateOperand() {
    if (storage.operand === '') {
        storage.operand = this.textContent;
        screen.textContent += " " + this.textContent + " ";
    }
}

function clear() {
    storage.num1 = '';
    storage.num2 = '';
    storage.operand = '';
    screen.textContent = '';
}

function negative() {
    if (screen.textContent.includes('-')) {
        screen.textContent = screen.textContent.substring(1);
        storage.num1 = storage.num1.substring(1);
    }
    else {
        storage.num1 = '-' + storage.num1;
        screen.textContent = '-' + screen.textContent;
    }
}

function backspace() {
    if (storage.operand === '') {
        storage.num1 = storage.num1.slice(0, -1);
        screen.textContent = screen.textContent.slice(0, -1);
    }
    else {
        storage.num2 = storage.num2.slice(0, -1);
        screen.textContent = screen.textContent.slice(0, -1);
    }
}

function ce() {
    if (screen.textContent.includes('-') || screen.textContent.includes('+')
    || screen.textContent.includes('x') || screen.textContent.includes('/')) {
        storage.num2 = '';
        storage.operand = '';
        screen.textContent = storage.num1;
}
else {
    clear();
}
}

function operate() {
    if (storage.num1 != '' && storage.num2 != '' && storage.operand != '') {
        let number1 = parseFloat(storage.num1);
        let number2 = parseFloat(storage.num2);

        if (storage.operand === '+') {
            result = number1 + number2;
            screen.textContent = result;
        }
        else if (storage.operand === '-') {
            result = number1 - number2;
            screen.textContent = result;
        }
        else if (storage.operand === '/') {
            if (number2 != 0) {
            result = number1 / number2;
            screen.textContent = result;
            }
            else {
                screen.textContent = 'MathError';
            }
        }
        else if (storage.operand === 'x') {
            result = number1 * number2;
            screen.textContent = result;
        }

        storage.num1 = result.toString();
        storage.operand = '';
        storage.num2 = '';
        console.log(storage.num1 + " " + storage.operand + " " + storage.num2);
    }
    
}