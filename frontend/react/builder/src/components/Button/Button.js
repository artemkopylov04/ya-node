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
      <button 
        disabled={props.disabled}
        className={props.inputClasses + " " + props.buttonClasses}
        onClick={props.onClick}
      >
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