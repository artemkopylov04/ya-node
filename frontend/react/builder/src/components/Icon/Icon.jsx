import React from 'react';
import './Icon.scss';

function Icon(props) {
  return (
    <div className={props.class} onClick={props.handler} />
  );
}

export default Icon;
