import React from 'react';
import Text from '../Text/Text';
import Divider from '../Divider/Divider';
import Icon from '../Icon/Icon';
import './Card.scss';

function Card(props) {

    const extended = props.extended ? 'true' : 'false';
    const ticket = props.ticket;
    const message = props.message;
    const branch = props.branch;
    const hash = props.hash;
    const commiter = props.commiter;
    const date = props.date;
    const duration = props.duration;

    return (
        <div className={"card card__extended_" + extended}>
            <div className="card__status">
                <Icon class="icon icon_size_l icon_done"/>
            </div>
            <div className={"card__info card__info_extended_" + extended}>
                <div className="card__commit-info">
                    <div className={"card__commit-message card__commit-message_extended_" + extended}>
                        <Text class="card__ticket card__ticket_done text" content={ticket}/>
                        <Text class="card__message text text_size_l" content={message}/>
                    </div>
                    <div className={"card__commit-about card__commit-about_extended_" + extended}>
                        <div className="card__branch-info">
                            <Icon class="card__branch-icon icon icon_size_m icon_commit"/>
                            <Text class="card__branch-name text text_size_m" content={branch}/>
                            <Text class="card__branch-hash text text_size_m" content={hash}/>
                        </div>
                        <div className="card__commiter">
                            <Icon class="card__user-icon icon icon_size_m icon_user"/>
                            <Text class="card__user-name text text_size_m" content={commiter}/>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className={"card__commit-times card__commit-times_extended_" + extended}>
                    <div className="card__commit-date">
                        <Icon class="card__commit-date-icon icon icon_size_m icon_calendar"/>
                        <Text class="text text_size_m" content={date}/>
                    </div>
                    <div className="card__build-duration">
                        <Icon class="card__build-duration-icon icon icon_size_m icon_watch"/>
                        <Text class="text text_size_m" content={duration}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;