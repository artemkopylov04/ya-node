import React from 'react';
import Text from '../Text/Text';
import './Label.scss';

function Label({title, required}) {

return (
    <div className="form__label">
        <Text class="text text_size_m text_inline" content={title} />
        {required && 
        <Text class="text text_margin_inline_s text_required text_inline" content="*" />
        }
    </div>
  )
}

export default Label;