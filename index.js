let state = {
    numbers: [],
    operation: '',
    display: 0,
    lastKeyWasOp: false,
    periodUsed: false,
    numberSwitchReady: false,
}

const container = document.querySelector('.buttonContainer');
container.addEventListener('click', (e) => {
    let val = e.target.value;
    if (val) {
        computeStep(val);
    }
});

function computeStep(step) {
    if("+-x/".indexOf(step) !== -1){
        state.numberSwitchReady = true;
        state.lastKeyWasOp = true;
        state.periodUsed = false;
        state.numbers.push(state.display);
        state.display = 0;
        if(state.numbers.length == 2){
            state.numbers.push(operate(state.operation, state.numbers.shift(), state.numbers.shift()));
        }
        state.operation = step;
    }
    else if(step === '.'){
        state.periodUsed = true;
        state.display = `${state.display}${step}`;
    }
    else if(step === '='){
        state.numberSwitchReady = true;
        state.numbers.push(state.display);
        if(state.numbers.length == 2){
            state.numbers.push(operate(state.operation, state.numbers.shift(), state.numbers.shift()));
        }
        state.display = state.numbers.shift();
    }
    else if(step === 'C'){
        state.numberSwitchReady = true;
        state.operation = '';
        state.numbers.length = 0;
        state.display = 0;
        state.lastKeyWasOp = false;
        state.periodUsed = false;
    }
    else{
        state.display = parseFloat((state.display == 0 || state.numberSwitchReady) ? step :`${state.display}${step}`);
        state.numberSwitchReady = false;
        state.lastKeyWasOp = false;
    }
    updateDisplay();
}

function operate(operand, n1, n2){
    switch(operand){
        case '+':
            return n1 + n2;
        break;
        case '-':
            return n1 - n2;
        break;
        case '/':
            return n1 / n2;
        break;
        case 'x':
            return n1 * n2;
        break;
        default:
        return 0;
        break;
    }
}

function updateDisplay() {
    const display = document.querySelector('.screen');
    display.textContent = state.display;
    if (state.lastKeyWasOp) {
        document.querySelectorAll('.op').forEach(op => {
            op.disabled = true;
        });
    }
    else{
        document.querySelectorAll('.op').forEach(op => {
            op.disabled = false;
        }); 
    }
    if (state.periodUsed) {
        document.querySelector('.period').disabled = true;
    }   
    else{
        document.querySelector('.period').disabled = false;
    }
}