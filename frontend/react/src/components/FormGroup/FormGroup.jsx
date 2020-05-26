import React from 'react';
import Text from '../Text/Text';
import Input from '../Input/Input';
import Label from '../Label/Label';
import './FormGroup.scss';

function FormGroup({label, input, type, style = 'column'}) {

    return (
        <div className={`form__group form__group_${style}`}>
            {style === 'column' && <Label title={label.title} required={label.required} />}
            {style === 'inline' && <Text content={label.before} />}
            <Input
                type={input.type}
                placeholder={input.placeholder}
                inputClasses={`input input_${input.type} text text_size_m ${input.error}`}
                model={input.model}
                handler={input.changeHandler}
                clear={input.clearHandler}
            />
            {style === 'inline' && <Text content={label.after} />}
        </div>
    )
}

export default FormGroup;
