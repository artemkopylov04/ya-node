import React from 'react';
import './Icon.scss';

export interface Icon {
  content: string,
  size: string,
  additional?: string,
  handler?: any,
}

const Icon: React.FC<Icon> = ({size, content, additional = '', handler}) => {
  return (
    <div className={`icon icon_size_${size} ${content} ${additional}`} onClick={handler} />
  );
}

export default Icon;
