import React from 'react';
import './Text.scss';

function Text(props) {
  return (
    <div className={props.class}>{props.content}</div>
  );
}

export default Text;