import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import './Start.scss';

function Start(props) {
  return (
    <div className="content">
      <Header 
        title = {
          <Text class="text text_size_xl text_color_title" content="School CI server" />
        }

        buttons = {
          <Link className="text_decoration_none" to="/settings">
            <Button
              isIcon
              isText
              buttonClasses="button button_primary button_size_s button_size_text-with-icon"
              textClasses="text text_size_m text_margin_s text_margin_s_with-icon text_mobile_hidden"
              iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_settings"
              content="Settings"
            />
          </Link>
        }
      />
      <div className="main">
        <div className="main__container start">
          <Icon class="card__commit-date-icon icon icon_size_xxxl icon_start" />
          <Text class="start-message text text_size_m text_wrap" content="Configure repository connection and synchronization settings" />
          <Link className="text_decoration_none" to="/settings">
            <Button
              isText
              buttonClasses="button button_success button_size_m"
              textClasses="start__open-settings-button text text_size_m text_margin_m"
              content="Open Settings"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
