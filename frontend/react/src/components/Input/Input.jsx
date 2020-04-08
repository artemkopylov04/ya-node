import React from 'react';
import MaskedInput from 'react-text-mask';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import './Input.scss';

function Input({
  type, disabled, inputClasses, textClasses,
  buttonClasses, placeholder, content, handler,
  model, iconClasses, clear
}) {
  console.log(model);
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
        <div className="form__input">
          <input
            type="text"
            className={inputClasses}
            placeholder={placeholder}
            value={model}
            onChange={handler}
          />
          {(model && model.length) && 
            <Icon
              class={iconClasses}
              handler={clear}
            />
          }
        </div>
      );
    case 'number':
      return (
        <MaskedInput
          className={inputClasses}
          mask={[/[0-9]/, /[0-9]/]}
          onChange={handler}
          placeholder={placeholder}
          value={model}
        />
      );
    default:
  }
}

export default Input;
