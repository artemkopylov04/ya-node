import React from 'react';
import './Log.scss';

interface Log {
  content: string,
}

const Log: React.FC<Log> = ({ content }) => {
  return (
    <div className="log">
      <div className="log__container text text_size_m" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Log;
