import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CalculatorButton extends LitElement {
    static properties = {
        type: {},
    };

    static styles = css`
        :host {
            display: flex;
            justify-content: center;
        }

        button { 
            display: inline-block;
            padding: 8px 10px;
            width: 56px;
            height: 100%;
            font-size: 1.8rem;
            text-align: center;
            border: 3px solid black;
            border-radius: 28px;
            box-shadow: rgb(0 0 0) 4px 4px 0px 0px;
            transform: translate(-4px, -4px);
            cursor: pointer;
            transition: all .2s ease-in-out;
        }

        button:hover {
            box-shadow: rgb(0 0 0) 2px 2px 0px 0px;
            transform: translate(-2px, -2px);
        }

        button:active {
            font-weight: bold;
            transform: translate(0px, 0px);
            box-shadow: rgb(0 0 0) 0px 0px 0px 0px;
        }

        button.operator {
            background-color: orange;
        }

        button.number {
            background-color: whitesmoke;
        }

        button.clear { 
            background-color: coral;
        }

        button.equals {
            vertical-align: top;
            color: white;
            background-color: blueviolet;
        }
    `

    render() {
        return html`
        <button class=${this.type} @click=${this.onClick}>
            <slot></slot>
        </button>
        `
    }

    onClick() {
        this.dispatchEvent(new CustomEvent('btnClick'));
    }
}
customElements.define('calculator-button', CalculatorButton)