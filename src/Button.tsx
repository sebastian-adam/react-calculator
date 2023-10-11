import React from "react";
import "./Button.css";

// NOTE: Button should be as "dumb" as possible

export interface ButtonValueProps {
  name: string | undefined;
  label: string | undefined;
  operator: () => void | undefined;
}

export interface ButtonProps {
  value: ButtonValueProps | string;
  onClick: (button) => void;
}

function Button({ value, onClick }: ButtonProps) {
  return (
    <button
      className="calculator-button"
      data-label={value}
      onClick={() => onClick(value)}
    >
      <span>{typeof value === "string" ? value : value.label}</span>
    </button>
  );
}

export default Button;
