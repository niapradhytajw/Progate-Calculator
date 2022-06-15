
//const screen = document.querySelector('.screen');

const numbers = document.querySelectorAll(".number")
//console.log(numbers)
const calculatorScreen = document.querySelector('.calculator-screen')

let currentNumber ='0';
let prevNumber = '0';
let calculationOperator ='';
let result = '';
//let operator = '';
//screenCalculator.value = '';


const updateScreen = (number) => {
    calculatorScreen.value = number
}

const inputNumber =(number) => {
    //currentNumber += number
    if(currentNumber === '0') {
        currentNumber = number
    } else {
        currentNumber += number
    }

}
var screen=document.querySelector('#screen');
  /* var operator=document.querySelectorAll('.operator');
for(item of operator)
    {
        item.addEventListener('click',(e)=>{
            operatortext=e.target.innerText;

            if(operatortext =='×')
            {
                operatortext= '*';
            }

            if(operatortext=='÷')
            {
                operatortext='/';
            }
            screen.value+=operatortext;
        });
    } */
function backspc()
    {
        screen.value=screen.value.substr(0,screen.value.length-1);
    }

numbers.forEach ((number) => {
    //console.log(number)
    number.addEventListener("click", (event) => {
        if(result){
            currentNumber = '';
            result = '';
        }
        //console.log("number is pressed")
        //console.log(event.target.value)
        //updateScreen(event.target.value)
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

/*const numbers = document.querySelectorAll(".number")

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        updateScreen(event.target.value)
    })
})*/

const operators = document.querySelectorAll(".operator")

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        if(prevNumber && currentNumber){
            calculate(prevNumber, currentNumber, calculationOperator);
            updateScreen(currentNumber);
        }
        //console.log(event.target.value)
        inputOperator(event.target.value)
    })
})

const inputOperator = (operator) => {
    if ( calculationOperator === '') {
         prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = ''
}

 const equalSign = document.querySelector('.equal-sign')

equalSign.addEventListener('click', () => {
    //console.log('equal button is pressed')
    calculate(prevNumber, currentNumber, operator)
    updateScreen(currentNumber)

    /*const history = {
        firstNumber : prevNumber,
        secondNumber : currentNumber,
        operator : operationOperator,
        result : result,
    };
    putHistory(history);
    renderHistory();
    showBtnClearHistory();
    operationOperators = '';
    currentNumber = '';
    screenCalculator.value = ''; */
}); 

/*const calculate = (number1, number2, operator) => {
    switch (operator) {
      case '/':
        result = parseFloat(number1) / parseFloat(number2);
        break;
      case '*':
        result = parseFloat(number1) * parseFloat(number2);
        break;
      case '-':
        result = parseFloat(number1) - parseFloat(number2);
        break;
      case '+':
        result = parseFloat(number1) + parseFloat(number2);
        break;
      default:
        return;
    }
    currentNumber = result;
    operator = '';
  }*/
    

const calculate = () => {
    switch(calculationOperator) {
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case '-':
            result = prevNumber - currentNumber
            break
        case '*':
            result = prevNumber * currentNumber
            break
        case '/':
            result = prevNumber / currentNumber
            break
        default:
            //break
            return
    }
    currentNumber = result
    calculationOperator = ''
} 

const clearBtn = document.querySelector('.all-clear')

clearBtn.addEventListener('click', () => {
    //console.log('AC Button is pressed')
    clearAll()
    updateScreen(currentNumber)
})

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';
    updateScreen(0);
}

const decimal = document.querySelector('.decimal')

decimal.addEventListener('click', (event) => {
    //console.log(event.target.value)
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

inputDecimal = (dot) => {
    if(currentNumber.includes('.')) {
        return
    }
    currentNumber += dot
}

const percentage = document.querySelector('.percentage');
percentage.addEventListener('click', () => {
    let resultPercentage = (currentNumber = parseInt(currentNumber) / 100);
    updateScreen(resultPercentage);
});

const negative = document.querySelector('.negative');

negative.addEventListener('click', (event) => {
    if (currentNumber < 0) {
        currentNumber = currentNumber * 1;
    } else {
        currentNumber = currentNumber *-1;
    }
    updateScreen(currentNumber);
});

const backspace = document.querySelector('.backspace');

backspace.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0,-1);
    updateScreen(currentNumber);
});


var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var output = reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else{
            var output = getOutput();
            var history = getHistory();
            if(output=="" && history!=""){

                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!=""){
                output = output=="" ? output : reverseNumberFormat(output);
                history = history+output;
                if(this.id=="="){
                    var result=eval(history);
                    printOutput(result);
                    printHistory("");
                }

                else if(this.id=="%"){
                    var n = reverseNumberFormat(getOutput());
                    var percent = n / 100;
                    printOutput(percent.toFixed(4));
                }
                else{
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output=reverseNumberFormat(getOutput());
        //if output is a number
        if(output!=NaN){
            output=output+this.id;
            printOutput(output);
            
        }
    });
}

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change',function(){
    if(this.checked){
        document.documentElement.setAttribute('data-theme','dark');
    }else{
        document.documentElement.setAttribute('data-theme','light');
    }
})

/*const audio = document
.querySelector('audio');

buttons 
.addEventListener('click', (e) => {
    let value = e.target.textContent;
    let updateScreen = screen.textContent;

    audio.play();

    switch (value) {
        case 'AC':
            screen.textContent = '';
            return;
        
        case '-':
            screen.textContent = eval(screenVal.replace('x', '*'));
            return;
        case '':
            screen.textContent = updateScreen.substring (0, updateScreen.length-1);
            return;
    }
    screen.textContent = updateScreen + value;
})*/
