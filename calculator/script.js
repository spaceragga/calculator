const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const sqrtBtn = document.querySelectorAll('[data-sqrt]');
// const previousOprnd = document.querySelector('[data-previous-operand]');
const currentOprnd = document.querySelector('[data-current-operand]');
const decimalBtn = document.querySelector('[data-decimal]');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';


numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        numberPress(btn.textContent);
});
});

operationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operationPress(btn.textContent);
});
});
  
decimalBtn.addEventListener('click', decimal);
equalsBtn.addEventListener('click', operationPress);

sqrtBtn.forEach(sqrt => {
  sqrt.addEventListener('click', () => {
    if(sqrt.textContent === '√') {
      if(currentOprnd.innerHTML != "0") {
        currentOprnd.innerHTML = Math.sqrt(+currentOprnd.innerHTML);
      }  
    } else {
        currentOprnd.innerHTML *= (-1);
        console.log(currentOprnd.innerHTML);  
  }
});
});

  function numberPress(number) {
    if(currentOprnd.innerHTML == "0") {
      currentOprnd.innerHTML = currentOprnd.innerHTML.slice(0, -1);
    }
      if (MemoryNewNumber) {
          currentOprnd.innerHTML = number;
          MemoryNewNumber = false;
        } else {
          if (currentOprnd.innerHTML === '') {
            currentOprnd.innerHTML = number;
          } else {
                currentOprnd.innerHTML += number;
      }
    }
  }
  
  function operationPress(op) {
    let localOperationMemory = currentOprnd.innerHTML;
  
    if (MemoryNewNumber && MemoryPendingOperation == '=') {
        currentOprnd.innerHTML = MemoryCurrentNumber;
    } else {
      MemoryNewNumber = true;
      if (MemoryPendingOperation === '+') {
        MemoryCurrentNumber += +localOperationMemory;
      } else if (MemoryPendingOperation === '-') {
        MemoryCurrentNumber -= +localOperationMemory;
      } else if (MemoryPendingOperation === '*') {
        MemoryCurrentNumber *= +localOperationMemory;
      } else if (MemoryPendingOperation === '/') {
        MemoryCurrentNumber /= +localOperationMemory;
      } else if (MemoryPendingOperation === '^') {
        MemoryCurrentNumber **= +localOperationMemory;
      } else {
        MemoryCurrentNumber = +localOperationMemory;
      }
      currentOprnd.innerHTML = MemoryCurrentNumber;
      currentOprnd.innerHTML = Math.round(currentOprnd.innerHTML * 1000000) / 1000000;
      MemoryPendingOperation = op;
    }
  }
  
  function decimal(argument) {
    let localDecimalMemory = currentOprnd.innerHTML;
  
    if (MemoryNewNumber) {
      localDecimalMemory = '0.';
      MemoryNewNumber = false;
    } else {
      if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
      }
    }
    currentOprnd.innerHTML = localDecimalMemory;
  }
  
deleteBtn.addEventListener("click", () => {
  if(currentOprnd.innerHTML != "0") {
    currentOprnd.innerHTML = currentOprnd.innerHTML.slice(0, -1);
  }
  if(currentOprnd.innerHTML == "") {
    currentOprnd.innerHTML = '0';
  }
});

allClearBtn.addEventListener("click", () => {
    currentOprnd.innerHTML = '0';
});