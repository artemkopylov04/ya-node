import React from 'react';
import './Button.scss';

function Button({
  disabled, onClick, additional,
  icon, text, color, size = "m"
}) {

  return (
    <button
      type="button"
      disabled={disabled}
      className={`button button_${color} button_size_${size} ${additional}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
