import React from 'react';
import Text from '../Text/Text';
import './Label.scss';

function Label({title, required}) {

return (
    <div className="form__label">
        <Text content={title} additional="text_inline" />
        {required && 
        <Text additional="text_margin_inline_s text_required text_inline" content="*" />
        }
    </div>
  )
}

export default Label;