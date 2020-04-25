import React from 'react';
import MaskedInput from 'react-text-mask';
import Icon from '../Icon/Icon';
import './Input.scss';

interface Input {
  type: string,
  inputClasses: string,
  placeholder: string,
  model: string | number,
  clear: any,
  handler: any,
}

const Input: React.FC<Input> = ({
  type, inputClasses, 
  placeholder, handler,
  model, clear
}) => {
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
          {(model && typeof model === 'string') && 
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
      return (
        <div></div>
      )
  }
}

export default Input;
