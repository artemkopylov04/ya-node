import React from 'react';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import './Button.scss';

function Button(props) {
  let text, icon;

  if (props.isIcon) {
    icon = <Icon class={props.iconClasses}/>
  }

  if (props.isText) {
    text = <Text class={props.textClasses} content={props.content}/>
  }

  if (props.inputClasses) {
    return (
      <button className={props.inputClasses + " " + props.buttonClasses}>
        {icon}
        {text}
      </button>
    );
  } else {
    return (
      <button className={props.buttonClasses}>
        {icon}
        {text}
      </button>
    );
  }
  
}

export default Button;