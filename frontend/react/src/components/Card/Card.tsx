import React from 'react';
import Text from '../Text/Text';
import Divider from '../Divider/Divider';
import Date from '../Date/Date';
import Icon from '../Icon/Icon';
import './Card.scss';

interface onClick {
  (id: string): void;
}

export interface Card {
  id: string,
  extended?: boolean,
  ticket: string,
  message: string,
  branch: string,
  hash: string,
  status?: string,
  commiter: string,
  date?: string,
  duration?: string,
  onClick?: onClick,
}

const Card: React.FC<Card> = (props) => {
  let status;
  switch (props.status) {
    case 'Waiting':
      status = 'clock';
      break;
    case 'InProgress':
      status = 'clock';
      break;
    case 'Success':
      status = 'done';
      break;
    case 'Failed':
      status = 'fail';
      break;
    default:
      status = 'fail';
      break;
  }
  const extended = props.extended ? 'true' : 'false';
  const { id } = props;
  const { ticket } = props;
  const { message } = props;
  const { branch } = props;
  const { hash } = props;
  const { commiter } = props;
  const { date } = props;
  const { duration } = props;
  const { onClick } = props;

  const middlewareClick = () => { if (onClick) onClick(id) };

  return (
    <div className={`card card__extended_${extended}`} onClick={extended === 'false' ? middlewareClick : undefined}>
      <div className="card__status">
        <Icon size="l" content={`icon_${status}`} />
      </div>
      <div className={`card__info card__info_extended_${extended}`}>
        <div className="card__commit-info">
          <div className={`card__commit-message card__commit-message_extended_${extended}`}>
            <Text additional={`card__ticket card__ticket_${status}`} content={ticket} />
            <Text additional="card__message" size="l" content={message} />
          </div>
          <div className={`card__commit-about card__commit-about_extended_${extended}`}>
            <div className="card__branch-info">
              <div className="card__branch-icon">
                <Icon size="m" content="icon_commit" />
              </div>
              <div className="card__branch-name">
                <Text content={branch} />
              </div>
              <div className="card__branch-hash">
                <Text content={hash} />
              </div>
            </div>
            <div className="card__commiter">
              <div className="card__user-icon">
                <Icon size="m" content="icon_user" />
              </div>
              <div className="card__user-name">
                <Text content={commiter} />
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={`card__commit-times card__commit-times_extended_${extended}`}>
          { date
            && (
            <div className="card__commit-date">
              <Icon additional="card__commit-date-icon" size="m" content="icon_calendar" />
              <Date type="date" content={date} />
            </div>
            )}
          { duration
            && (
            <div className="card__build-duration">
              <Icon additional="card__build-duration-icon" size="m" content="icon_watch" />
              <Date type="duration" content={duration} />
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Card;
