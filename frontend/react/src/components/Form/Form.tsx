import React from 'react';
import Text from '../Text/Text';
import FormGroup from '../FormGroup/FormGroup';
import './Form.scss';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';

import { Form as F, FormComponent } from '../../typings';
import { setFormButtonsToStatusDisabled } from '../../store/actions';
import { State } from '../../store/state';

const Form: React.FC<F> = ({title, description, components, handlers, error, submitText, cancelText}) => {

  const dispatch = useDispatch();
  const disabled = useSelector<State, boolean>(state => state.formButtonsDisabled);

  const onSubmit = () => {
    dispatch(setFormButtonsToStatusDisabled(true));
    handlers.submit();
  }
  const onCancel = () => handlers.cancel();

  return (
    <div className="form">
      <div className="form__title">
        <Text size="l" messageId={title} content={title} />
      </div>
      { description && 
      <div className="form__description">
        <Text messageId={description} content={description} />
      </div> }
      {components.map((component: FormComponent, index: number) => {
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
          size="m"
          additional="form__btn_save"
          text={
            <Text messageId="save" content={submitText} margin="m" />
          }
          onClick={onSubmit}
        />
        <Button
          disabled={disabled}
          color="primary"
          size="m"
          additional="form__btn_cancel"
          text={
            <Text messageId="cancel" content={cancelText} margin="m" />
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
