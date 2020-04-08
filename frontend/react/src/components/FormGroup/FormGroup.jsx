import React from 'react';
import Text from '../Text/Text';
import Input from '../Input/Input';
import Label from '../Label/Label';
import './FormGroup.scss';

function FormGroup({label, input, type, style}) {

return (
    <div className={`form__group ${style === 'column' ? 'form__group_column' : ''}`}>
        {style === 'column' && <Label title={label.title} required={label.required} />}
        {style === 'inline' && <Text class="text text_size_m" content={label.before} />}
        <Input
            type={input.type}
            inputClasses={input.inputClasses}
            placeholder={input.placeholder}
            inputClasses={`input input_${input.type} text text_size_m ${input.validate}`}
            iconClasses='form__input_clear-icon icon icon_size_m icon_clear'
            model={input.model}
            handler={input.changeHandler}
            clear={input.clearHandler}
        />
        {style === 'inline' && <Text class="text text_size_m" content={label.after} />}
    </div>
  )
}

export default FormGroup;
