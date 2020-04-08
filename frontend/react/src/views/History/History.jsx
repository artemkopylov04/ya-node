import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Popup from '../../components/Popup/Popup';
import './History.scss';
import { useSelector } from 'react-redux';

function History(props) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [builds, setBuilds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const settings = useSelector(state => state.settings);

  useEffect(() => {
    axios(
      `/api/builds?limit=10&offset=${offset}`,
    )
      .then((res) => {
        if (res.data.data.data.length === 10) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setBuilds([...builds, ...res.data.data.data]);
        setIsLoaded(true);
      })
      .catch((e) => console.error(e));
  }, [offset]);

  const showMoreHandler = () => {
    setOffset(offset + 10);
  };

  const openPopup = () => {
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  return (
    <div className="content">
      { popupIsOpen && <Popup cancelHandler={closePopup} />}
      <Header 
        title = {
          <Text class="text text_size_xl text_color_repo" content={settings.repoName} />
        }
        buttons = {
          <Fragment>
            <Button
              isIcon
              isText
              buttonClasses="button button_primary button_size_s button_size_text-with-icon"
              textClasses="text text_size_m text_margin_s text_margin_s_with-icon text_mobile_hidden"
              iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_play"
              onClick={openPopup}
              content="Run build"
            />,
            <Link className="text_decoration_none" to="/settings">
              <Button
                isIcon
                buttonClasses="button button_primary button_size_s button_size_icon"
                iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_settings"
              />
            </Link>
          </Fragment>
        }
      />
      <div className="main">
        { isLoaded
        && <div className="main__container history">
          {builds.map((item) => (
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
          { showMore &&
          <div className="history-more">
            <Button
              isText
              buttonClasses="history-more__button button button_size_s button_primary"
              textClasses="text text_size_m text_margin_m"
              onClick={showMoreHandler}
              content="Show more"
            />
          </div>
          }
        </div>
      }
      </div>
    </div>
  );
}

export default History;
