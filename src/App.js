import React, { useState } from "react";
import "./App.css";
import CalculatorDisplay from "./components/CalculatorDisplay";

function App(props) {
  const [displayValue, setDisplayValue] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperator, setWaitingForOperator] = useState(false);

  const CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "X": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "=": (prevValue, nextValue) => nextValue
  };

  return (
    <div className="root">

      <div id="wrapper">
        <CalculatorDisplay value={displayValue} />

        {/*first row */}
        <div className="row">
          <button className="button first-row-button" onClick={() => onClearInput()}>AC</button>
          <button className="button first-row-button" onClick={() => onToggleSign()}>±</button>
          <button className="button first-row-button" onClick={() => clearLastDigit()}><i className="fas fa-backspace"></i></button>
          <button className="button operator-button" onClick={() => onOperatorInput("/")}>÷</button>
        </div>

        {/*second row */}
        <div className="row">
          {createButtons([7, 8, 9])}
          <button className="button operator-button" onClick={() => onOperatorInput("X")}>x</button>
        </div>

        {/*third row */}
        <div className="row">
          {createButtons([4, 5, 6])}
          <button className="button operator-button" onClick={() => onOperatorInput("-")}>-</button>
        </div>

        {/*fourth row */}
        <div className="row">
          {createButtons([1, 2, 3])}
          <button className="button operator-button" onClick={() => onOperatorInput("+")}>+</button>
        </div>

        {/*fifth row */}
        <div className="row">
          <button className="button" style={{ flex: "2.3" }} onClick={() => onDigitInput("0")}>0</button>
          <button className="button" onClick={() => onDotInput()}>.</button>
          <button className="button operator-button" onClick={() => onOperatorInput("=")}>=</button>
        </div>

      </div>
    </div>
  );

  function createButtons(buttonsData) {
    return buttonsData.map(x => (
      <button className="button" key={x} onClick={() => onDigitInput(String(x))}>{x}</button>
    ));
  }

  function clearLastDigit() {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0');
  }

  function onDigitInput(digit) {
    let digitInsertedValue;
    if (waitingForOperator) {
      setDisplayValue(digit);
      setWaitingForOperator(false);
    } else {
      digitInsertedValue = displayValue === "0" ? digit : displayValue + String(digit);
      setDisplayValue(digitInsertedValue);
    }
  }

  function onClearInput() {
    setDisplayValue("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperator(false);
  }

  function onToggleSign() {
    const signToggledValue = displayValue.includes("-") ? displayValue.substring(1) : "-" + displayValue;
    setDisplayValue(signToggledValue);
  }

  function onDotInput() {
    const dotInsertedValue = displayValue.includes(".") ? displayValue : displayValue + ".";
    setDisplayValue(dotInsertedValue);
  }

  function onOperatorInput(operatorInserted) {
    const inputValue = parseFloat(displayValue);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue;
      let newValue = CalculatorOperations[operator](currentValue, inputValue);

      // Incase of 0/0
      if (isNaN(newValue)) {
        newValue = Number.POSITIVE_INFINITY;
        console.log(newValue);
      }


      setPrevValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperator(true);
    setOperator(operatorInserted);
  }
}

export default App;
