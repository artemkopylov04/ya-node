import React from 'react';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import './Button.scss';

function Button({
  isIcon, isText, content, inputClasses,
  textClasses, iconClasses, buttonClasses,
  disabled, onClick,
}) {
  let text,
    icon, classes;

  if (isIcon) {
    icon = <Icon class={iconClasses} />;
  }

  if (isText) {
    text = <Text class={textClasses} content={content} />;
  }

  if (inputClasses) {
    classes = `${inputClasses} ${buttonClasses}`;
  } else {
    classes = buttonClasses;
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
