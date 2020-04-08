import React from 'react';
import Text from '../Text/Text';
import FormGroup from '../FormGroup/FormGroup';
import Input from '../Input/Input';
import './Form.scss';
import { useState } from 'react';

function Form({title, description, components, handlers, error}) {

  const [disabled, setDisabled] = useState(false);

  return (
    <div className="form">
      <div className="form__title">
        <Text class="text text_size_l" content={title} />
      </div>
      <div className="form__description">
        <Text class="text text_size_m" content={description} />
      </div>
      {components.map((component, index) => {
        return (
          <FormGroup
            key={index}
            style = {component.style}
            label = {
              {
                title: component.title,
                required: component.required,
                before: component.before,
                after: component.after
              }
            }

            input = {
              {
                type: component.type,
                validate: component.validate,
                placeholder: component.placeholder,
                model: component.state,
                clearHandler: component.clearHandler,
                changeHandler: component.onChangeHandler
              }
            }
          />
        )
      })}
      <div className="form__buttons">
        <Input
          isText
          disabled={disabled}
          type="submit"
          inputClasses="form__btn_save"
          buttonClasses="button button_success button_size_m"
          textClasses="text text_size_m text_margin_m"
          content="Save"
          handler={handlers.submit}
        />
        <Input
          isText
          disabled={disabled}
          type="submit"
          inputClasses="form__btn_cancel"
          buttonClasses="button button_primary button_size_m"
          textClasses="text text_size_m text_margin_m"
          content="Cancel"
          handler={handlers.cancel}
        />
      </div>
      { error.errorStatus &&
      <div className="form__error">
        <Text class="text text_size_l" content={error.errorText} />
      </div>
      }
    </div>
  );
}

export default Form;
