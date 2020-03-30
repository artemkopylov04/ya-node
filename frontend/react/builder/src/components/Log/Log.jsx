import React from 'react';
import Text from '../Text/Text';
import './Log.scss';

function Log({ content }) {
  const log = content;

  return (
    <div className="log">
      <Text class="log__container text text_size_m" content={log} />
    </div>
  );
}

export default Log;
