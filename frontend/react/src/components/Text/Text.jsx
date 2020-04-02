import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './Text.scss';

function Text(props) {
  const { content } = props;
  const { duration } = props;
  const { date } = props;

  let text = content;

  if (date) {
    text = format(new Date(content), 'd MMM HH:mm', { locale: ru });
  }

  if (duration) {
    const minutes = Math.floor(content / 1000) % 60;
    if (content > (60 * 1000)) {
      const hours = Math.floor(content / (60 * 1000));
      text = `${hours} ч ${minutes} мин`;
    } else {
      text = `${minutes} мин`;
    }
  }

  return (
    <div className={props.class}>{text}</div>
  );
}

export default Text;
