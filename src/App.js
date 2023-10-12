import "./App.css";

import { useState, useEffect } from "react";
import Button from "./Button.tsx";

//TODO: Convert this file to Typescript

///////
// Calculator constants
///////

// Calulate the input
const EQUALS_ID = "equals";
const EQUALS = {
  name: EQUALS_ID,
  label: "=",
  operator: (equationParts) => {
    const equationNumbers = equationParts.filter((part, i) => (i + 1) % 2);
    const equationOperators = equationParts.filter((part, i) => i % 2);

    // Initiate a running total with the first number value
    let runningTotal = equationNumbers[0];

    // Loop over operators, combining the numbers that surround them
    equationOperators.forEach((operator, i) => {
      runningTotal = operator.operator(runningTotal, equationNumbers[i + 1]);
    });

    // TODO: The equation is currently run sequentially, but we should consider order of operations eventually
    return runningTotal;
  },
};

// Clear the input
const CLEAR_ID = "clear";
const CLEAR = {
  name: CLEAR_ID,
  label: "A/C",
  operator: () => 0,
};

// First-order operators
const MULTIPLY = {
  name: "multiply",
  label: "x",
  operator: (x, y = 1) => x * y,
};

const DIVIDE = {
  name: "divide",
  label: "÷",
  operator: (x, y = 1) => x / y,
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
  operator: (x, y) => +x + (+y || 0),
};

const MINUS = {
  name: "minus",
  label: "-",
  operator: (x, y) => x - (y || 0),
};

// Calculator layout
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

  // When the user clicks a calculator button...
  function onClick(nextValue) {
    const lastValue = equation[equation.length - 1];
    const valuesBeforeLastValue = equation.slice(0, -1);

    // ...if the equation is unitialized...
    if (equation.length === 0) {
      // ...and the first value is a string, add the digit as a new item on array.
      // Note: Don't allow user submitted leading zeros
      if (typeof nextValue === "string" && nextValue !== "0") {
        setEquation([nextValue]);
      }
      // (If the first value is not a string, do nothing.)
      // ...else if the equation is already initialized...
    } else {
      // ...and if the user hits clear, then reset state by emptying it.
      if (nextValue?.name === CLEAR_ID) {
        setEquation([]);
        // ...or if the user hits equals, reduce the array to one total value.
      } else if (nextValue?.name === EQUALS_ID) {
        setEquation([nextValue.operator(equation).toString()]);
      } else {
        // If the last value in the "equation" array and the next value are unalike in type, they are separate items on array.
        if (typeof lastValue !== typeof nextValue) {
          setEquation([...equation, nextValue]);
        }

        // If the last value in the "equation" array is a string, and the next value is a string, combine them into one number.
        // Note: Do nothing if the the user is trying to add a second decimal to a number
        if (
          typeof lastValue === "string" &&
          typeof nextValue === "string" &&
          !(lastValue.includes(".") && nextValue === ".")
        ) {
          setEquation([...valuesBeforeLastValue, `${lastValue}${nextValue}`]);
        }

        // If the last value in the "equation" array is an operator, and the next value is an operator, overwrite previous operator.
        if (lastValue?.operator && nextValue?.operator) {
          setEquation([...valuesBeforeLastValue, nextValue]);
        }
      }
    }
  }

  // Presentation layer
  const [stringValue, setStringValue] = useState([]);

  useEffect(() => {
    // We need to present numbers with leading decimals as having a leading 0
    const getStringValue = (value) =>
      value.charAt(0) === "." ? `0${value}` : value;

    const equationLabels = equation.map((value) =>
      typeof value === "string" ? getStringValue(value) : value.label
    );

    setStringValue(equationLabels.join(""));
  }, [equation]);

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1>Calculator</h1>
        </header>
      </div>
      <main className="calculator">
        <div className="display">{stringValue || 0}</div>
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
