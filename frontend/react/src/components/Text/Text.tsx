import React from 'react';
import './Text.scss';

export interface Text {
  content: string,
  margin?: string,
  size?: string,
  color?: string,
  additional?: string,
}

const Text: React.FC<Text> = ({
  content, margin = '', size = 'm', color = 'common', additional = ''
}) => {

  let marginClass = margin ? `text_margin_${margin}` : "";

  return (
    <div className={`text text_size_${size} text_color_${color} ${marginClass} ${additional}`}>{content}</div>
  );
}

export default Text;
