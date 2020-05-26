import React from 'react';
import Text from '../Text/Text';
import Input from '../Input/Input';
import Label from '../Label/Label';
import './FormGroup.scss';
import { onClick, onChange } from '../../typings';
import { useIntl } from 'react-intl';

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

    const intl = useIntl();
    
    const inputComponent = <Input
        type={input.type}
        placeholder={input.placeholder}
        inputClasses={`input input_${input.type} text text_size_m ${input.error}`}
        model={input.model}
        handler={input.changeHandler}
        clear={input.clearHandler}
    />;

    const message = intl.formatMessage(
        {
            id: 'synchronize'
        },
        {
            before: (...chunks) => <Text content={chunks.toString() || ''} />,
            x: inputComponent,
            after: (...chunks) => <Text content={chunks.toString() || ''} />,
        },
    )

    if (style === 'inline') return (
        <div className={`form__group form__group_${style}`}>
            {message}
        </div>
    );

    return (
        <div className={`form__group form__group_${style}`}>
            {style === 'column' && <Label title={label.title} required={label.required} />}
            <Input
                type={input.type}
                placeholder={input.placeholder}
                inputClasses={`input input_${input.type} text text_size_m ${input.error}`}
                model={input.model}
                handler={input.changeHandler}
                clear={input.clearHandler}
            />
        </div>
    )
}

export default FormGroup;
