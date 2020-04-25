import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSettings, setNewSettings, setFormButtonsToStatusDisabled } from '../../store/actions';
import Header from '../../components/Header/Header';
import Text from '../../components/Text/Text';
import Form from '../../components/Form/Form';
import './Settings.scss';

import { State, Settings as SettingsI } from '../../store/state'; 

import { FormComponent } from '../../typings';

function Settings() {

  const history = useHistory();
  const dispatch = useDispatch();

  const settings = useSelector<State, SettingsI>(state => state.settings);

  const [repoName, setRepoName] = useState(settings.repoName || '')
  const [buildCommand, setBuildCommand] = useState(settings.buildCommand || '')
  const [mainBranch, setMainBranch] = useState(settings.mainBranch || '')
  const [period, setPeriod] = useState(settings.period || '')

  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const [repoError, setRepoError] = useState('');
  const [commandError, setCommandError] = useState('');

  const components: FormComponent[] = [
    {
      title: 'GitHub repository',
      required: true,
      state: repoName,
      style: 'column',
      type: 'text',
      error: repoError,
      placeholder: 'user-name/repo-name',
      clearHandler() { setRepoName('') },
      onChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        if (event.currentTarget.value.length > 0) setRepoError('');
        setRepoName(event.currentTarget.value);
      }
    },
    {
      title: 'Build command',
      required: true,
      state: buildCommand,
      style: 'column',
      type: 'text',
      error: commandError,
      placeholder: 'npm run build',
      clearHandler: () => setBuildCommand(''),
      onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.value.length > 0) setCommandError('');
        setBuildCommand(event.currentTarget.value);
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
      onChangeHandler: (event: React.FormEvent<HTMLInputElement>) =>
        setMainBranch(event.currentTarget.value),
    },
    {
      title: '',
      state: period,
      required: false,
      style: 'inline',
      type: 'number',
      before: 'Synchronize every',
      after: 'minutes',
      placeholder: '15',
      onChangeHandler: (event: React.FormEvent<HTMLInputElement>) => 
        setPeriod(event.currentTarget.value),
    },
  ];

  // с колбэком от формы
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
        await dispatch(
          setNewSettings({
            repoName,
            buildCommand,
            mainBranch,
            period: Number(period)
          }));
  
        dispatch(setSettings({
          repoName,
          buildCommand,
          mainBranch,
          period: Number(period)
        }));
    
        history.push('/');
      } catch(e) {
        setErrorStatus(true);
        setError('Непредвиденная ошибка');
        setTimeout(() => setErrorStatus(false), 5000);
        console.error(e);
      } finally {
        dispatch(setFormButtonsToStatusDisabled(false));
      }
    } else {
      dispatch(setFormButtonsToStatusDisabled(false));
    }
  };

  const handleCancel = () => {
    history.go(-1);
    dispatch(setFormButtonsToStatusDisabled(false));
  }

  return (
    <div className="content">
      <Header 
        title = {
          <Text size="xl" color="title" content="School CI server" />
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
            submitText='Save'
            cancelText='Cancel'
            error={{
              text: error,
              status: errorStatus,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
