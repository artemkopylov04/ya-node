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

  return (
    <div className={props.buttonClasses}>
      {text}
      {icon}
    </div>
  );
}

export default Button;