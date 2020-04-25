import React from 'react';
import Form from '../Form/Form';
import './Popup.scss';
import { FormComponent } from '../../typings';

interface Popup {
  cancelHandler: any,
  submitHandler: any,
  error: string,
  errorStatus: boolean,
  components: FormComponent[],
}

const Popup: React.FC<Popup> = ({
  cancelHandler, submitHandler, error, errorStatus, components
}) => {

  return (
    <div className="popup__layout">
      <div className="popup">
        <div className="popup__container">
          <Form 
            title="New build" 
            description=""
            components={components}
            handlers={{
              submit: submitHandler,
              cancel: cancelHandler
            }}
            submitText='Run build'
            cancelText='Cancel'
            error={{
              text: error,
              status: errorStatus,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Popup;
