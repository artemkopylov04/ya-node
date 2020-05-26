import React from 'react';
import {useIntl} from 'react-intl';
import './Text.scss';

export interface Text {
  content: string,
  messageId?: string,
  margin?: string,
  size?: string,
  color?: string,
  additional?: string,
}

const Text: React.FC<Text> = ({
  content = '', margin = '', size = 'm', color = 'common', additional = '', messageId = '',
}) => {

  const intl = useIntl();

  const text: string = messageId ? intl.formatMessage({
    id: messageId,
    defaultMessage: content
  }) : content;

  let marginClass = margin ? `text_margin_${margin}` : "";

  return (
    <div className={`text text_size_${size} text_color_${color} ${marginClass} ${additional}`}>
      {text}
    </div>
  );
}

export default Text;
