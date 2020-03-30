import React from 'react';
import { useHistory } from 'react-router-dom';
import Text from '../Text/Text';
import Divider from '../Divider/Divider';
import Icon from '../Icon/Icon';
import './Card.scss';

function Card(props) {
  const history = useHistory();

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

  const openBuild = () => {
    history.push(`/build/${id}`);
  };

  return (
    <div className={`card card__extended_${extended}`} onClick={extended === 'false' ? openBuild : null}>
      <div className="card__status">
        <Icon class={`icon icon_size_l icon_${status}`} />
      </div>
      <div className={`card__info card__info_extended_${extended}`}>
        <div className="card__commit-info">
          <div className={`card__commit-message card__commit-message_extended_${extended}`}>
            <Text class={`card__ticket card__ticket_${status} text`} content={ticket} />
            <Text class="card__message text text_size_l" content={message} />
          </div>
          <div className={`card__commit-about card__commit-about_extended_${extended}`}>
            <div className="card__branch-info">
              <Icon class="card__branch-icon icon icon_size_m icon_commit" />
              <Text class="card__branch-name text text_size_m" content={branch} />
              <Text class="card__branch-hash text text_size_m" content={hash} />
            </div>
            <div className="card__commiter">
              <Icon class="card__user-icon icon icon_size_m icon_user" />
              <Text class="card__user-name text text_size_m" content={commiter} />
            </div>
          </div>
        </div>
        <Divider />
        <div className={`card__commit-times card__commit-times_extended_${extended}`}>
          { date
                        && (
                        <div className="card__commit-date">
                          <Icon class="card__commit-date-icon icon icon_size_m icon_calendar" />
                          <Text class="text text_size_m" date content={date} />
                        </div>
                        )}
          { duration
                        && (
                        <div className="card__build-duration">
                          <Icon class="card__build-duration-icon icon icon_size_m icon_watch" />
                          <Text class="text text_size_m" duration content={duration} />
                        </div>
                        )}
        </div>
      </div>
    </div>
  );
}

export default Card;
