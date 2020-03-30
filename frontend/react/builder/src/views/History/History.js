import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Popup from '../../components/Popup/Popup';
import './History.scss';

function History(props) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [builds, setBuilds] = useState([]);
    const [isLoaded, setIsLoaded] = useState('history_loading');

    useEffect(() => {
        axios(
          '/api/builds',
        )
        .then((res) => { 
            setBuilds(res.data.data.data);
            setIsLoaded('');
        })
        .catch(e => console.error(e));
     }, []);

    const openPopup = () => {
        setPopupIsOpen(true);
    }

    const closePopup = () => {
        setPopupIsOpen(false);
    }

    return (
    <div className={`content`}>
        <Popup isOpen={popupIsOpen} cancelHandler={closePopup} /> 
        <div className="header">
            <div className="header__container">
                <div className="header__title">
                    <Text class="text text_size_xl text_color_repo" content={props.settings.repoName} />
                </div>
                <div className="header__buttons">
                    <Button 
                        isIcon
                        isText
                        buttonClasses="button button_primary button_size_s button_size_text-with-icon" 
                        textClasses="text text_size_m text_margin_s text_margin_s_with-icon text_mobile_hidden" 
                        iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_play"
                        onClick={openPopup}
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
            <div className={`main__container history ${isLoaded}`}>
                {builds.map(item => (
                    <Card
                        key={item.id}
                        id={item.id}
                        status={item.status} 
                        ticket={item.buildNumber} 
                        message={item.commitMessage} 
                        branch={item.branchName}
                        hash={item.commitHash}
                        commiter={item.authorName}
                        date={item.start || false}
                        duration={item.duration || false}
                    />
                ))}
                <div className="history-more">
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