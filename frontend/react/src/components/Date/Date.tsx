import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Text from '../Text/Text';
import { useIntl } from 'react-intl';

interface Date {
  content: string,
  type: string
}

const Date: React.FC<Date> = ({content, type}) => {

  const intl = useIntl();

  let text: string = '';

  switch(type) {
    case "date":
      if (localStorage.getItem('lang') === 'ru') {
        text = format(new window.Date(content), 'd MMM HH:mm', { locale: ru });
      } else {
        text = format(new window.Date(content), 'd MMM HH:mm');
      }
      break;
    case "duration":
      const minutes = Math.floor(Number(content) / 1000) % 60;
      if (Number(content) > (60 * 1000)) {
        const hours = Math.floor(Number(content) / (60 * 1000));
        text = intl.formatMessage(
          {
            id: 'durationMinutesAndHours',
          },
          {
            minutes: minutes,
            hours: hours,
          }
        )
      } else {
        text = intl.formatMessage(
          {
            id: 'durationMinutesOnly',
          },
          {
            minutes,
          }
        )
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
