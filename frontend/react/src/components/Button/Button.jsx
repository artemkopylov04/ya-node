import React from 'react';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import './Button.scss';

function Button({
  isIcon, isText, content, inputClasses,
  textClasses, iconClasses, buttonClasses,
  disabled, onClick,
}) {
  let text; let
    icon;

  if (isIcon) {
    icon = <Icon class={iconClasses} />;
  }

  if (isText) {
    text = <Text class={textClasses} content={content} />;
  }

  if (inputClasses) {
    return (
      <button
        type="button"
        disabled={disabled}
        className={`${inputClasses} ${buttonClasses}`}
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    );
  }
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
