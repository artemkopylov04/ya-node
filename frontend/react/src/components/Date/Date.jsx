import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Text from '../Text/Text';

function Date({content, type}) {

  let text;

  switch(type) {
    case "date":
      text = format(new window.Date(content), 'd MMM HH:mm', { locale: ru });
      break;
    case "duration":
      const minutes = Math.floor(content / 1000) % 60;
      if (content > (60 * 1000)) {
        const hours = Math.floor(content / (60 * 1000));
        text = `${hours} ч ${minutes} мин`;
      } else {
        text = `${minutes} мин`;
      }
      break;
    default:
      break;
  }

  return (
    <Text content={text} />
  );
}

export default Date;
