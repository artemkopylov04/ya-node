import React from 'react';
import './Button.scss';
import { onClick } from '../../typings/index';

export interface Button {
  disabled?: boolean,
  onClick?: onClick,
  additional?: string,
  icon?: React.ReactNode,
  text?: React.ReactNode,
  color: string,
  size: string,
}

const Button: React.FC<Button> = ({
  disabled, onClick, additional,
  icon, text, color, size = "m"
}) => {

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
