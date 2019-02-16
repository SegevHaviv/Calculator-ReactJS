import React, { useState } from "react";
import "./App.css";

function App(props) {
  const [displayValue, setDisplayValue] = useState("0");
  // const [operandInserted, setOperandInserted] = useState(false);
  // const [prevValue, setPrevValue] = useState(0);
  return (
    <div className="root">
      <div id="wrapper">
        <div className="result-display">{displayValue}</div>

        {/*first row */}
        <div className="row">
          <button
            className="button first-row-button"
            onClick={() => onClearInput()}
          >
            AC
          </button>
          <button
            className="button first-row-button"
            onClick={() => onToggleSign()}
          >
            ±
          </button>
          <button className="button first-row-button">%</button>
          <button
            className="button operator-button"
            onClick={() => onOperandInput("/")}
          >
            ÷
          </button>
        </div>

        {/*second row */}
        <div className="row">
          {createButtons([7, 8, 9])}
          <button
            className="button operator-button"
            onClick={() => onOperandInput("x")}
          >
            x
          </button>
        </div>

        {/*third row */}
        <div className="row">
          {createButtons([4, 5, 6])}
          <button
            className="button operator-button"
            onClick={() => onOperandInput("-")}
          >
            -
          </button>
        </div>

        {/*fourth row */}
        <div className="row">
          {createButtons([1, 2, 3])}
          <button
            className="button operator-button"
            onClick={() => onOperandInput("+")}
          >
            +
          </button>
        </div>

        {/*fifth row */}
        <div className="row">
          <button
            className="button"
            style={{ flex: "2.3" }}
            onClick={() => onDigitInput(0)}
          >
            0
          </button>
          <button className="button" onClick={() => onDotInput()}>
            .
          </button>
          <button className="button operator-button">=</button>
        </div>
      </div>
    </div>
  );

  function createButtons(buttonsData) {
    return buttonsData.map(x => (
      <button className="button" key={x} onClick={() => onDigitInput(x)}>
        {x}
      </button>
    ));
  }

  function onDigitInput(digit) {
    setDisplayValue(
      displayValue === "0" ? digit : displayValue + String(digit)
    );
  }

  function onClearInput() {
    setDisplayValue("0");
  }

  function onToggleSign() {
    let numberValue = Number.parseFloat(displayValue);
    numberValue = -numberValue;
    setDisplayValue(String(numberValue));
  }

  function onDotInput() {
    setDisplayValue(
      displayValue.includes(".") ? displayValue : displayValue + "."
    );
  }

  function onOperandInput(operand) {
    console.log(operand);
  }
}

export default App;
