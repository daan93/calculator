import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ref, createRef } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

import "./calculator-button.js";

class CalculatorWrapper extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 24px;
            border: 4px solid black;
            border-radius: 8px;
            box-shadow: rgb(0 0 0) 8px 8px 0px 0px;
            background-color: antiquewhite;
        }

        .input {
            border-radius: 1px;
            height: 60px;
            padding-right: 15px;
            padding-top: 10px;
            text-align: right;
            margin-right: 6px;
            font-size: 2.5rem;
            overflow-x: auto;
            color: white;
            border-radius: 2px;
            background-color: black;
            transition: all .2s ease-in-out;
        }

        .input:hover {
            border: 1px solid #bbb;
            -webkit-box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
            box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
        }

        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 20px;
            padding-top: 20px;
        }

        .equals {
            grid-area: 2 / 4 / 6 / 5;
        }
  `;

    inputRef = createRef();

    render() {
        return html`
        <div class="input" ${ref(this.inputRef)}></div>
        <div class="buttons">
            <calculator-button .type=${'operator'} @btnClick=${(e) => this.operatorButtonHandler(e)}>+</calculator-button>
            <calculator-button .type=${'operator'} @btnClick=${(e) => this.operatorButtonHandler(e)}>-</calculator-button>
            <calculator-button .type=${'operator'} @btnClick=${(e) => this.operatorButtonHandler(e)}>&times;</calculator-button>
            <calculator-button .type=${'operator'} @btnClick=${(e) => this.operatorButtonHandler(e)}>&divide;</calculator-button>

            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>7</calculator-button>
            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>8</calculator-button>
            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>9</calculator-button>

            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>4</calculator-button>
            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>5</calculator-button>
            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>6</calculator-button>

            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>1</calculator-button>
            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>2</calculator-button>
            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>3</calculator-button>

            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>0</calculator-button>
            <calculator-button .type=${'number'} @btnClick=${(e) => this.numberButtonHandler(e)}>.</calculator-button>
            <calculator-button .type=${'clear'} @click=${() => this.input.innerHTML = ''}>C</calculator-button>

            <calculator-button class="equals" .type=${'equals'} @click=${this.equalButtonHandler}>=</calculator-button>
        </div>
        `;
    }

    resultDisplayed = false; // flag to keep an eye on what output is displayed
    input = null; // input/output button

    firstUpdated() {
        this.input = this.inputRef.value;
    }

    numberButtonHandler(e) {
        // storing current input string and its last character in variables - used later
        let currentString = this.input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        // if result is not diplayed, just keep adding
        if (this.resultDisplayed === false) {
            this.input.innerHTML += e.target.innerHTML;
        } else if (this.resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            // if result is currently displayed and user pressed an operator
            // we need to keep on adding to the string for next operation
            this.resultDisplayed = false;
            this.input.innerHTML += e.target.innerHTML;
        } else {
            // if result is currently displayed and user pressed a number
            // we need clear the input string and add the new input to start the new opration
            this.resultDisplayed = false;
            this.input.innerHTML = "";
            this.input.innerHTML += e.target.innerHTML;
        }
    }

    operatorButtonHandler(e) {
        // storing current input string and its last character in variables - used later
        let currentString = this.input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        // if last character entered is an operator, replace it with the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            this.input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an opearator, don't do anything
            console.log("enter a number first");
        } else {
            // else just add the operator pressed to the input
            this.input.innerHTML += e.target.innerHTML;
        }
    }

    equalButtonHandler() {
        // this is the string that we will be processing eg. -10+26+33-56*34/23
        let inputString = this.input.innerHTML;

        // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
        let numbers = inputString.split(/\+|\-|\×|\÷/g);

        // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
        // first we replace all the numbers and dot with empty string and then split
        let operators = inputString.replace(/[0-9]|\./g, "").split("");

        console.log(inputString);
        console.log(operators);
        console.log(numbers);
        console.log("----------------------------");

        // now we are looping through the array and doing one operation at a time.
        // first divide, then multiply, then subtraction and then addition
        // as we move we are alterning the original numbers and operators array
        // the final element remaining in the array will be the output

        let divide = operators.indexOf("÷");
        while (divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }

        let multiply = operators.indexOf("×");
        while (multiply != -1) {
            numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
            operators.splice(multiply, 1);
            multiply = operators.indexOf("×");
        }

        let subtract = operators.indexOf("-");
        while (subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
        }

        let add = operators.indexOf("+");
        while (add != -1) {
            // using parseFloat is necessary, otherwise it will result in string concatenation :)
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+");
        }

        this.input.innerHTML = numbers[0]; // displaying the output

        this.resultDisplayed = true; // turning flag if result is displayed
    }
}
customElements.define('calculator-wrapper', CalculatorWrapper)