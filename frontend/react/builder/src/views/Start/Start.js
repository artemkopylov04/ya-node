import React from 'react';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import './Start.scss';

function Start(props) {
  return (
    <div className="content">
        <div className="header">
            <div className="header__container">
                <div className="header__title">
                    <Text class="text text_size_xl text_color_title" content="School CI server" />
                </div>
                <Button 
                    isIcon
                    isText
                    buttonClasses="button button_primary button_size_s button_size_text-with-icon" 
                    textClasses="text text_size_m text_margin_s text_margin_s_with-icon text_mobile_hidden" 
                    iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_settings"
                    content="Settings"/>
            </div>
        </div>
        <div className="main">
            <div className="main__container start">
                <svg width="124" height="124" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M54.253 23.272V35.09l7.193 7.192c-1.647-8.427.848-17.024 6.903-23.078 4.916-4.916 11.431-7.556 18.165-7.556h.29L72.902 25.5l3.657 21.94 21.944 3.657L112.38 37.22c.073 6.853-2.567 13.44-7.556 18.428-2.253 2.252-4.893 3.972-7.702 5.231.436.387.945.702 1.356 1.114l7.436 7.434c2.543-1.525 4.965-3.366 7.12-5.545 9.228-9.227 13.007-22.836 9.858-35.501a8.463 8.463 0 00-5.91-6.103 8.407 8.407 0 00-8.235 2.18L94.53 38.648l-7.847-1.307-1.308-7.846 14.193-14.191c2.156-2.155 2.979-5.304 2.156-8.234a8.414 8.414 0 00-6.104-5.933c-12.885-3.196-26.133.485-35.506 9.832-2.47 2.47-4.48 5.255-6.128 8.21l.267.193v3.899zm-28.58 86.67c-3.1 3.1-8.55 3.1-11.65 0a8.21 8.21 0 01-2.422-5.812c0-2.203.848-4.262 2.422-5.811l32.552-32.547-8.21-8.21L5.812 90.085C2.059 93.839 0 98.827 0 104.13c0 5.304 2.059 10.292 5.813 14.046 3.754 3.753 8.743 5.812 14.047 5.812 5.305 0 10.294-2.059 14.048-5.812l24.438-24.434c-2.35-3.827-3.682-8.186-3.803-12.617l-28.87 28.817zm95.693-14.118L93.004 67.467c-5.594-5.594-13.95-6.684-20.683-3.366L46.502 38.286V23.248L15.501 0 0 15.498l23.251 30.998h15.04l25.82 25.814c-3.295 6.732-2.23 15.087 3.366 20.68l28.361 28.358c3.536 3.536 9.252 3.536 12.764 0l12.764-12.762c3.512-3.535 3.512-9.25 0-12.762z" fill="#000" fill-opacity=".1"/></svg>
                <Text class="start-message text text_size_m text_wrap" content="Configure repository connection and synchronization settings" />
                <Button 
                    isText
                    buttonClasses="button button_success button_size_m"
                    textClasses="text text_size_m text_margin_m"
                    content="Open Settings"/>
            </div>
        </div>
    </div>
  );
}

export default Start;