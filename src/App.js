import React, { useState } from "react";
import "./App.css";

class AutoScalingText extends React.Component {
  state = {
    scale: 1
  };

  componentDidUpdate() {
    const { scale } = this.state

    const node = this.node
    const parentNode = node.parentNode

    const availableWidth = parentNode.offsetWidth
    const actualWidth = node.offsetWidth
    const actualScale = availableWidth / actualWidth

    if (scale === actualScale)
      return

    if (actualScale < 1) {
      this.setState({ scale: actualScale })
    } else if (scale < 1) {
      this.setState({ scale: 1 })
    }
  }

  render() {
    const { scale } = this.state

    return (
      <div
        className="auto-scaling-text"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={node => this.node = node}
      >{this.props.children}</div>
    )
  }
}

function CalculatorDisplay(props) {

  const language = navigator.language || 'en-US'
  let formattedValue = parseFloat(props.value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  })

  // Add back missing .0 in e.g. 12.0
  const match = props.value.match(/\.\d*?(0*)$/)

  if (match)
    formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

  return (
    <div {...props} className="calculator-display">
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </div>
  )
}


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
          <button className="button" style={{ flex: "2.3" }} onClick={() => onDigitInput(0)}> 0 </button>
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
    console.log(operatorInserted);
    const inputValue = parseFloat(displayValue);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);

      setPrevValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperator(true);
    setOperator(operatorInserted);
  }
}

export default App;
