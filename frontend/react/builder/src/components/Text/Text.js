import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './Text.scss';

function Text(props) {
  let text = props.content;

  if (props.date) {
    text = format(new Date(props.content), 'd MMM HH:mm', {locale: ru});
  }

  if (props.duration) {
    const minutes = Math.floor(props.content / 1000) % 60;
    if (props.content > (60 * 1000)) {
      const hours = Math.floor(props.content / (60 * 1000));
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