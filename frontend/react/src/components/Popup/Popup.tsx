import React from 'react';
import Form from '../Form/Form';
import './Popup.scss';
import { FormComponent, onClick } from '../../typings';

interface Popup {
  cancelHandler: onClick,
  submitHandler: onClick,
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
            title="popupTitleBuild" 
            description=""
            components={components}
            handlers={{
              submit: submitHandler,
              cancel: cancelHandler
            }}
            submitText='runBuild'
            cancelText='cancel'
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
