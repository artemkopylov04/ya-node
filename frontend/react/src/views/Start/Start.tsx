import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import './Start.scss';

const Start: React.FC = () => {

  const history = useHistory();

  const toSettings = () => history.push("/settings");

  return (
    <div className="content">
      <Header 
        title = {
          <Text size="xl" color="title" messageId="schoolCIServer" content="School CI server" />
        }

        buttons = {
          <Link className="text_decoration_none" to="/settings">
            <Button
              color="primary"
              size="s"
              additional="button_size_text-with-icon"
              text={
                <Text content="Settings" messageId="settings" margin="s" additional="text_margin_s_with-icon text_mobile_hidden" />
              }
              icon = {
                <Icon 
                content="icon_settings" 
                size="s" 
                additional="icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full" />
              }
            />
          </Link>
        }
      />
      <div className="main">
        <div className="main__container start">
          <Icon size="xxxl" content="icon_start" additional="card__commit-date-icon" />
          <div className="start-message">
            <Text messageId="settingsDescription" content="Configure repository connection and synchronization settings" />
          </div>
          <div className="start__open-seetings-button">
            <Button
              color="success"
              size="m"
              text={
                <Text messageId="openSettings" content="Open Settings" margin="m" />
              }
              onClick={toSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
