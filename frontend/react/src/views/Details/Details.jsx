import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLog, getBuild, reBuild } from '../../store/actions';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Card from '../../components/Card/Card';
import Log from '../../components/Log/Log';
import './Details.scss';

function Details() {
  const dispatch = useDispatch();
  const history = useHistory();
  const settings = useSelector(state => state.settings);

  const { id } = useParams();

  const [build, setBuild] = useState({});
  const [buildLoaded, setBuildLoaded] = useState(false);
  const [log, setLog] = useState('');
  const [logLoaded, setLogLoaded] = useState(false);

  useEffect(() => {
    setBuildLoaded(false);
    dispatch(getBuild(id, setBuild, () => setBuildLoaded(true)))

    setLogLoaded(false);
    dispatch(getLog(id, setLog, () => setLogLoaded(true)))
    
  }, [id, dispatch]);

  const onReBuild = () => dispatch(reBuild(
    build, 
    (id) => history.push(`/build/${id}`), 
    setLogLoaded));

  return (
    <div className="content">
      <Header  
        title = { 
          <Text
            size="xl"
            color="repo"
            content={settings.repoName}
          /> 
        }
        buttons = {
          <Fragment>
            <Button
              color="primary"
              size="s"
              additional="button_size_text-with-icon"
              text={
                <Text content="Rebuild" margin="s" additional="text_margin_s_with-icon text_mobile_hidden" />
              }
              icon = {
                <Icon 
                content="icon_rebuild" 
                size="s" 
                additional="icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full" />
              }
              onClick={onReBuild}
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
        { buildLoaded
          && (
          <div className="main__container details">
            <div className="details__card">
              <Card
                extended
                id={build.id}
                key={build.id}
                status={build.status}
                ticket={build.buildNumber}
                message={build.commitMessage}
                branch={build.branchName}
                hash={build.commitHash}
                commiter={build.authorName}
                date={build.start}
                duration={build.duration}
              />
            </div>
            { logLoaded
              && (
              <div className="details__log">
                <Log content={log} />
              </div>
              )}
          </div>
          )}
      </div>
    </div>
  );
}

export default Details;
