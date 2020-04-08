import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSettings } from '../../store/actions';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Form from '../../components/Form/Form';
import './Settings.scss';

function Settings() {

  const history = useHistory();
  const dispatch = useDispatch();

  const settings = useSelector(state => state.settings);

  const [repoName, setRepoName] = useState(settings.repoName || '')
  const [buildCommand, setBuildCommand] = useState(settings.buildCommand || '')
  const [mainBranch, setMainBranch] = useState(settings.mainBranch || '')
  const [period, setPeriod] = useState(settings.period || '')

  const components = [
    {
      title: 'GitHub repository',
      required: true,
      state: repoName,
      style: 'column',
      type: 'text',
      placeholder: 'user-name/repo-name',
      clearHandler() { setRepoName('') },
      onChangeHandler(event) {
        if (event.target.value.length > 0) setRepoName('');
        setRepoName(event.target.value);
      }
    },
    {
      title: 'Build command',
      required: true,
      state: buildCommand,
      style: 'column',
      type: 'text',
      placeholder: 'npm run build',
      clearHandler: () => setBuildCommand(''),
      onChangeHandler: (event) => {
        if (event.target.value.length > 0) setBuildCommand('');
        setBuildCommand(event.target.value);
      }
    },
    {
      title: 'Main Branch',
      required: false,
      state: mainBranch,
      style: 'column',
      type: 'text',
      placeholder: 'master',
      clearHandler: () => setMainBranch(''),
      onChangeHandler: (event) => setMainBranch(event.target.value),
    },
    {
      state: period,
      style: 'inline',
      type: 'number',
      before: 'Synchronize every',
      after: 'minutes',
      placeholder: '15',
      onChangeHandler: (event) => setPeriod(event.target.value),
    },
  ];

  const [errorText, setErrorText] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const [repoValidationError, setRepoError] = useState('');
  const [commandValidationError, setCommandError] = useState('');

  const handleSubmit = async () => {
    let error;
    if (repoName.length === 0) {
      error = true;
      setRepoError('input_error');
    }
    if (buildCommand.length === 0) {
      error = true;
      setCommandError('input_error');
    }
    if (error === undefined) {
      try {
        await axios({
          method: 'POST',
          url: '/api/settings',
          data: {
            repoName,
            buildCommand,
            mainBranch,
            period: parseInt(period, 10),
          },
        });

        dispatch(setSettings({
          repoName,
          buildCommand,
          mainBranch,
          period,
        }));

        history.push('/');
      } catch(e) {
        setErrorStatus(true);
        setErrorText('Непредвиденная ошибка');
        setTimeout(() => setErrorStatus(false), 5000);
        console.error(e);
      }
    }
  };

  const handleCancel = () => history.push('/');

  return (
    <div className="content">
      <Header 
        title = {
          <Text class="text text_size_xl text_color_title" content="School CI server" />
        }
      />
      <div className="main">
        <div className="main__container">
          <Form 
            title="Settings" 
            description="Configure repository connection and synchronization settings."
            components={components}
            handlers={{
              submit: handleSubmit,
              cancel: handleCancel
            }}
            error={{
              text: '',
              status: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
