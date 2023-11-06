const previousOperationText = document.querySelector(".operation");
const currentOperationText = document.querySelector(".result");

const buttons = document.querySelectorAll(".buttons button");

class Calculator {
	constructor(currentOperationText, previousOperationText) {
		this.previousOperationText = previousOperationText;
		this.currentOperationText = currentOperationText;
		this.currentOperation = "";
	}

	addDigit(digit) {
		if (digit === "." && this.currentOperationText.innerText.includes(".")) {
			return;
		}

		this.currentOperation = digit;
		this.updateScreen();
	}

	processOperation(operation) {
		if (this.currentOperationText.innerText === "" && operation !== "C") {
			if (this.previousOperationText !== "") {
				this.changeMathOperation(operation);
			}
			return;
		}
        
		let operationValue;
		const previous = +this.previousOperationText.innerText.split(" ")[0];
		const current = +this.currentOperationText.innerText;

		switch (operation) {
			case "+":
				operationValue = previous + current;
				this.updateScreen(operationValue, operation, current, previous);
				break;
			case "-":
				operationValue = previous - current;
				this.updateScreen(operationValue, operation, current, previous);
				break;
			case "/":
				operationValue = previous / current;
				this.updateScreen(operationValue, operation, current, previous);
				break;
			case "*":
				operationValue = previous * current;
				this.updateScreen(operationValue, operation, current, previous);
				break;
			case "DEL":
				this.processDelOperation();
				break;
			case "CE":
				this.processClearCurrentOperation();
				break;
			case "C":
				this.processClearAllOperation();
				break;
			case "=":
				this.processEqualsOperation();
				break;
			default:
				return;
		}
	}

	updateScreen(operationValue = null, operation = null, current = null, previous = null) {
		if (operationValue === null) {
			this.currentOperationText.innerText += this.currentOperation;
		} else {
			if (previous === 0) {
				operationValue = current;
			}

			this.previousOperationText.innerText = `${operationValue} ${operation}`;
			this.currentOperationText.innerText = "";
		}
	}

	changeMathOperation(operation) {
		const mathOperations = ["+", "-", "*", "/"];

		if (!mathOperations.includes(operation)) {
			return;
		}

		this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
	}

	processDelOperation() {
		this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
	}

	processClearCurrentOperation() {
		this.currentOperationText.innerText = "";
	}

	processClearAllOperation() {
		this.currentOperationText.innerText = "";
		this.previousOperationText.innerText = "";
	}

	processEqualsOperation() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
        // this.currentOperationText.innerText = previousOperationText.innerText.split(" ")[0];
    }
}

const calc = new Calculator(currentOperationText, previousOperationText);

buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		const value = btn.innerText;

		if (+value >= 0 || value === ".") {
			calc.addDigit(value);
		} else {
			calc.processOperation(value);
		}
	});
});
