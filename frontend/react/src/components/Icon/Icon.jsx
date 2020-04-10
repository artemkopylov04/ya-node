import React from 'react';
import './Icon.scss';

function Icon({size, content, additional, handler}) {
  return (
    <div className={`icon icon_size_${size} ${content} ${additional}`} onClick={handler} />
  );
}

export default Icon;
