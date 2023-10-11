import "./App.css";

import { useState, useEffect } from "react";
import Button from "./Button.tsx";

//TODO: Convert this file to Typescript
// TODO: Move constants to another file

///////
// Calculator constants
///////

// Submission operators
const EQUALS = {
  name: "equals",
  label: "=",
  operator: () => 999, // FIXME
};

const CLEAR = {
  name: "clear",
  label: "A/C",
  operator: () => 0,
};

const SUBMISSION_OPERATORS = [EQUALS, CLEAR];

// First-order operators
const MULTIPLY = {
  name: "multiply",
  label: "x",
  operator: (x, y) => x * y,
};

const DIVIDE = {
  name: "divide",
  label: "÷",
  operator: (x, y) => x / y,
};

const DIVIDE_BY_100 = {
  name: "divide by 100",
  label: "%",
  operator: (x) => x / 100,
};

const MULTIPLY_BY_MINUS_1 = {
  name: "multiply by -1",
  label: "±",
  operator: (x) => x * -1,
};

// Second-order operators
const PLUS = {
  name: "plus",
  label: "+",
  operator: (x, y) => x + y,
};

const MINUS = {
  name: "minus",
  label: "-",
  operator: (x, y) => x - y,
};

// NOTE: Order matters to presentation
const operatorButtons = [
  CLEAR,
  MULTIPLY_BY_MINUS_1,
  DIVIDE_BY_100,
  DIVIDE,
  "7",
  "8",
  "9",
  MULTIPLY,
  "4",
  "5",
  "6",
  MINUS,
  "1",
  "2",
  "3",
  PLUS,
  "0",
  ".",
  EQUALS,
];

function App() {
  // Local state variable "equation" is an array of operators and numbers
  const [equation, setEquation] = useState([]);
  // TODO: The equation is currently run sequentially, but we should consider order of operations

  // When the user clicks a calculator button...
  function onClick(nextValue) {
    const lastValue = equation[equation.length - 1];
    const valuesBeforeLastValue = equation.slice(0, -1);

    // ..if the last value in the "equation" array is undefined, and the next value is a string, append
    if (equation.length === 0 && typeof nextValue === "string") {
      setEquation([nextValue]);
    }

    // ..if the last value in the "equation" array is a string, and the next value is a string, combine
    if (typeof lastValue === "string" && typeof nextValue === "string") {
      setEquation([...valuesBeforeLastValue, `${lastValue}${nextValue}`]);
    }

    // ..if the the next value is a a submission operator, reduce (to single item)

    // ..if the last value in the "equation" array is an operator, and the next value is an operator, replace

    // ..if the last value in the "equation" array and the next value are unalike in type, append
  }

  // Presentation layer
  const [stringValue, setStringValue] = useState([]);

  useEffect(() => {
    const equationLabels = equation.map((value) =>
      typeof value === "string" ? equation : equation.label
    );

    setStringValue(equationLabels.join());
  }, [equation]);

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1>Calculator</h1>
        </header>
      </div>
      <main className="calculator">
        <div className="display">{stringValue}</div>
        <div className="keypad">
          {operatorButtons.map((button) => {
            return (
              <Button
                key={button?.name || button}
                value={button}
                onClick={onClick}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
