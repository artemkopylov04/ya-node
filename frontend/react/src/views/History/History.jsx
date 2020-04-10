import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Icon from '../../components/Icon/Icon';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Popup from '../../components/Popup/Popup';
import './History.scss';
import { runBuild, getBuilds } from '../../store/actions';


function History() {
  const history = useHistory();
  const dispatch = useDispatch();

  const settings = useSelector(state => state.settings);

  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [builds, setBuilds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const [hash, setHash] = useState('');
  const [hashError, setHashError] = useState('');

  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const components = [
    {
      title: 'Enter the commit hash which you want to build',
      required: false,
      state: hash,
      style: 'column',
      type: 'text',
      error: hashError,
      placeholder: 'Commit hash',
      clearHandler() { setHash('') },
      onChangeHandler(event) {
        if (event.target.value.length > 0) setHashError('');
        setHash(event.target.value);
      }
    }
  ]

  const handleSubmit = (cb) => {
    if (hash.length === 0) {
      setHashError('input_error');
      cb();
    } else {
      dispatch(runBuild(hash, openBuild, {
        status: setErrorStatus,
        text: setError,
      }, cb));
    }
  };

  useEffect(() => {
    dispatch(getBuilds(offset, builds, setShowMore, setBuilds, setIsLoaded))
  }, [offset, dispatch]);

  const showMoreHandler = () => {
    setOffset(offset + 10);
  };

  const openPopup = () => {
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  const openBuild = (id) => history.push(`/build/${id}`);

  return (
    <div className="content">
      { popupIsOpen && <Popup
       cancelHandler={closePopup} 
       submitHandler={handleSubmit}
       components={components}
       error={error}
       errorStatus={errorStatus}
      />}
      <Header 
        title = {
          <Text size="xl" color="repo" content={settings.repoName} />
        }
        buttons = {
          <Fragment>
            <Button
              color="primary"
              size="s"
              additional="button_size_text-with-icon"
              text={
                <Text content="Run build" margin="s" additional="text_margin_s_with-icon text_mobile_hidden" />
              }
              icon = {
                <Icon 
                content="icon_play" 
                size="s" 
                additional="icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full" />
              }
              onClick={openPopup}
            />
            <Link className="text_decoration_none" to="/settings">
              <Button
                color="primary"
                size="s"
                icon = {
                  <Icon 
                  content="icon_settings" 
                  size="s" 
                  additional="icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full" />
                }
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
              onClick={openBuild}
            />
          ))}
          { showMore &&
          <div className="history-more">
            <div className="history-more__button">
              <Button
                color="primary"
                size="s"
                text = {
                  <Text content="Show more" margin="m"/>
                }
                onClick={showMoreHandler}
              />
            </div>
          </div>
          }
        </div>
      }
      </div>
    </div>
  );
}

export default History;
