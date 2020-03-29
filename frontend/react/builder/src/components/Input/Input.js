import React from 'react';
import MaskedInput from 'react-text-mask'
import Button from '../Button/Button';
import './Input.scss';

function Input(props) {
    switch (props.type) {
        case 'submit':
            return (
                <Button 
                    isText
                    inputClasses={props.inputClasses}
                    buttonClasses={props.buttonClasses}
                    textClasses={props.textClasses}
                    content={props.content}/>
            )
        case 'text':
            return (
                <input 
                    type="text" 
                    className={props.inputClasses} 
                    placeholder={props.placeholder}
                    value={props.defaultValue}
                    onChange={props.handler}
                />
            )
        case 'number':
            return (
                <MaskedInput
                    className={props.inputClasses}
                    mask={[/[0-9]/, /[0-9]/ ]}
                    onChange={props.handler}
                    value={props.defaultValue}
                />
            )
        default:
            return
    }
}

export default Input;