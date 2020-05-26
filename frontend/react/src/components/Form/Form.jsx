import React from 'react';
import Text from '../Text/Text';
import FormGroup from '../FormGroup/FormGroup';
import './Form.scss';
import { useState } from 'react';
import Button from '../Button/Button';

function Form({title, description, components, handlers, error, submitText, cancelText}) {

  const [disabled, setDisabled] = useState(false);

  const onClick = (handler) => {
    setDisabled(true);
    handler(() => setDisabled(false));
  }

  const onSubmit = () => onClick(handlers.submit);
  const onCancel = () => onClick(handlers.cancel);

  return (
    <div className="form">
      <div className="form__title">
        <Text size="l" content={title} />
      </div>
      { description && 
      <div className="form__description">
        <Text content={description} />
      </div> }
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
                error: component.error,
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
        <Button
          disabled={disabled}
          color="success"
          additional="form__btn_save"
          text={
            <Text content={submitText} margin="m" />
          }
          onClick={onSubmit}
        />
        <Button
          disabled={disabled}
          color="primary"
          additional="form__btn_cancel"
          text={
            <Text content={cancelText} margin="m" />
          }
          onClick={onCancel}
        />
      </div>
      { error.status &&
      <div className="form__error">
        <Text size="l" content={error.text} />
      </div>
      }
    </div>
  );
}

export default Form;
