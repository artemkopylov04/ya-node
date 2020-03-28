import React from 'react';
import Button from '../Button/Button';
import './Input.scss';

function Input(props) {
    if (props.submit) {
        return (
            <Button 
                isText
                inputClasses={props.inputClasses}
                buttonClasses={props.buttonClasses}
                textClasses={props.textClasses}
                content={props.content}/>
        )
    }
}

export default Input;