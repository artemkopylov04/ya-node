import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import './History.scss';

function History(props) {
  return (
    <div className="content">
        <div className="header">
            <div className="header__container">
                <div className="header__title">
                    <Text class="text text_size_xl text_color_repo" content="philip1967/my-awesome-repo" />
                </div>
                <div className="header__buttons">
                    <Button 
                        isIcon
                        isText
                        buttonClasses="button button_primary button_size_s button_size_text-with-icon" 
                        textClasses="text text_size_m text_margin_s text_margin_s_with-icon text_mobile_hidden" 
                        iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_play"
                        content="Run build"/>
                    <Link className="text_decoration_none" to="/settings">
                        <Button 
                            isIcon
                            buttonClasses="button button_primary button_size_s button_size_icon" 
                            iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_settings"
                            />
                    </Link>
                </div>
            </div>
        </div>
        <div className="main">
            <div className="main__container history">
                <Card ticket="#1389" 
                    message="add documentation for postgres scaler" 
                    branch="master" 
                    commiter="Artem Kopylov"
                    date="21 янв, 03:06"
                    duration="1 ч 20 мин"/>
                <Card ticket="#1389" 
                    message="add documentation for postgres scaler" 
                    branch="master" 
                    commiter="Artem Kopylov"
                    date="21 янв, 03:06"
                    duration="1 ч 20 мин"/>
                <Card ticket="#1389" 
                    message="add documentation for postgres scaler" 
                    branch="master" 
                    commiter="Artem Kopylov"
                    date="21 янв, 03:06"
                    duration="1 ч 20 мин"/>
                <Card ticket="#1389" 
                    message="add documentation for postgres scaler" 
                    branch="master" 
                    commiter="Artem Kopylov"
                    date="21 янв, 03:06"
                    duration="1 ч 20 мин"/>
                <Card ticket="#1389" 
                    message="add documentation for postgres scaler" 
                    branch="master" 
                    commiter="Artem Kopylov"
                    date="21 янв, 03:06"
                    duration="1 ч 20 мин"/>
                <Card ticket="#1389" 
                    message="add documentation for postgres scaler" 
                    branch="master" 
                    commiter="Artem Kopylov"
                    date="21 янв, 03:06"
                    duration="1 ч 20 мин"/>
                <Card ticket="#1389" 
                    message="add documentation for postgres scaler" 
                    branch="master" 
                    commiter="Artem Kopylov"
                    date="21 янв, 03:06"
                    duration="1 ч 20 мин"/>
                <div class="history-more">
                    <Button 
                        isText
                        buttonClasses="history-more__button button button_size_s button_primary"
                        textClasses="text text_size_m text_margin_m"
                        content="Show more"/>
                </div>

            </div>
        </div>
    </div>
  );
}

export default History;