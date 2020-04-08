import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Log from '../../components/Log/Log';
import './Details.scss';

function Details(props) {
  const history = useHistory();

  const { id } = useParams();

  const [build, setBuild] = useState({});
  const [buildLoaded, setBuildLoaded] = useState(false);
  const [log, setLog] = useState('');
  const [logLoaded, setLogLoaded] = useState(false);

  useEffect(() => {
    setBuildLoaded(false);
    axios(
      `/api/builds/${id}`,
    )
      .then((res) => {
        setBuild(res.data.data.data);
        setBuildLoaded(true);
      })
      .catch((e) => console.error(e));
  }, [id]);

  useEffect(() => {
    setLogLoaded(false);
    axios(
      `/api/builds/${id}/logs`,
    )
      .then((res) => {
        setLog(res.data);
        if (res.data.length > 0) {
          setLogLoaded(true);
        }
      })
      .catch((e) => console.error(e));
  }, [id]);

  const reBuild = () => {
    axios.post(
      `/api/builds/${build.commitHash}`,
    )
      .then(({ data }) => {
        if (data && data.data && data.data.id) {
          setLogLoaded(false);
          history.push(`/build/${data.data.id}`);
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="content">
      <Header  
        title = { 
          <Text
            class="text text_size_xl text_color_repo"
            content={props.settings.repoName}
          /> 
        }
        buttons = {
          <Fragment>
            <Button
              onClick={reBuild}
              isIcon
              isText
              buttonClasses="button button_primary button_size_s button_size_text-with-icon"
              textClasses="text text_size_m text_margin_s text_margin_s_with-icon text_mobile_hidden"
              iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_rebuild"
              content="Rebuild"
            />
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
