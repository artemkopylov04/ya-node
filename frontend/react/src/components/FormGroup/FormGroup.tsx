import React from 'react';
import Text from '../Text/Text';
import Input from '../Input/Input';
import Label from '../Label/Label';
import './FormGroup.scss';
import { onClick, onChange } from '../../typings';

export interface FormGroup {
    label: {
        title: string,
        required: boolean,
        before?: string,
        after?: string,
    }
    input: {
        type: string,
        placeholder: string,
        error?: string,
        model: string | number,
        changeHandler: onChange,
        clearHandler?: onClick,
    },
    type?: string,
    style: string,
}

const FormGroup: React.FC<FormGroup> = ({label, input, style = 'column'}) => {

    return (
        <div className={`form__group form__group_${style}`}>
            {style === 'column' && <Label title={label.title} required={label.required} />}
            {style === 'inline' && <Text content={label.before || ''} />}
            <Input
                type={input.type}
                placeholder={input.placeholder}
                inputClasses={`input input_${input.type} text text_size_m ${input.error}`}
                model={input.model}
                handler={input.changeHandler}
                clear={input.clearHandler}
            />
            {style === 'inline' && <Text content={label.after || ''} />}
        </div>
    )
}

export default FormGroup;
