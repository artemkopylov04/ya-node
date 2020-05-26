import React from 'react';
import MaskedInput from 'react-text-mask';
import Icon from '../Icon/Icon';
import './Input.scss';

function Input({
  type, inputClasses, 
  placeholder, handler,
  model, iconClasses, clear
}) {
  switch (type) {
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
              size="m"
              content="icon_clear"
              additional="form__input_clear-icon"
              handler={clear}
            />
          }
        </div>
      );
    case 'number':
      return (
        <div className="form__input">
          <MaskedInput
            className={inputClasses}
            mask={[/[0-9]/, /[0-9]/]}
            onChange={handler}
            placeholder={placeholder}
            value={model}
          />
        </div>
      );
    default:
  }
}

export default Input;
