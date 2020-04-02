import React from 'react';
import MaskedInput from 'react-text-mask';
import Button from '../Button/Button';
import './Input.scss';

function Input({
  type, disabled, inputClasses, textClasses,
  buttonClasses, placeholder, content, handler,
  defaultValue,
}) {
  switch (type) {
    case 'submit':
      return (
        <Button
          isText
          disabled={disabled}
          inputClasses={inputClasses}
          buttonClasses={buttonClasses}
          textClasses={textClasses}
          content={content}
          onClick={handler}
        />
      );
    case 'text':
      return (
        <input
          type="text"
          className={inputClasses}
          placeholder={placeholder}
          value={defaultValue}
          onChange={handler}
        />
      );
    case 'number':
      return (
        <MaskedInput
          className={inputClasses}
          mask={[/[0-9]/, /[0-9]/]}
          onChange={handler}
          placeholder={placeholder}
          value={defaultValue}
        />
      );
    default:
  }
}

export default Input;
