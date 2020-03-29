import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import './Form.scss';

function Form({settings, setSettings, setSettingsAreSet}) {
    const history = useHistory();

    const [repoName, setRepoName] = useState(settings.repoName);
    const [buildCommand, setBuildCommand] = useState(settings.buildCommand);
    const [mainBranch, setMainBranch] = useState(settings.mainBranch);
    const [period, setPeriod] = useState(settings.period);

    const [disabled, setDisabled] = useState(false);

    const [repoValidationError, setRepoError] = useState('');
    const [commandValidationError, setCommandError] = useState('');

    const handleRepoChange = (event) => {
        if (event.target.value.length > 0) setRepoError('');
        setRepoName(event.target.value);
    }
    const handleCommandChange = (event) => {
        if (event.target.value.length > 0) setCommandError('');
        setBuildCommand(event.target.value);
    }
    const handleBranchChange = (event) => setMainBranch(event.target.value);
    const handlePeriodChange = (event) => setPeriod(event.target.value);

    const clearRepo = () => setRepoName('');
    const clearCommand = () => setBuildCommand('');
    const clearBranch = () => setMainBranch('');

    const handleSubmit = (event) => {
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
            setDisabled(true);
            axios({
                    method: 'POST',
                    url: '/api/settings',
                    data: {
                        repoName, 
                        buildCommand, 
                        mainBranch, 
                        period: parseInt(period)
                    }
                })
                .then((res) => {
                    setSettings({
                        repoName: repoName,
                        buildCommand: buildCommand,
                        mainBranch: mainBranch,
                        period: period,
                    });
                    setSettingsAreSet(true); 
                    history.push('/');
                })
                .catch(e => console.error(e));
        }
    }
    const handleCancel = (event) => history.push('/');

    return (
        <div className="form">
            <div className="form__title">
                <Text class="text text_size_m" content="Settings" />
            </div>
            <div className="form__description">
                <Text className="text text_size_m" content="Configure repository connection and synchronization settings." />
            </div>
            <div className="form__github-repo form__group">
                <div className="form__label">
                    <Text class="text text_size_m text_inline" content="GitHub repository" />
                    <Text class="text text_margin_inline_s text_required text_inline" content="*" />
                </div>
                <div className="form__input">
                    <Input 
                        type="text" 
                        inputClasses={"input input_text text text_size_m " + repoValidationError} 
                        placeholder="user-name/repo-name"
                        defaultValue={repoName}
                        handler={handleRepoChange} 
                    />
                    {repoName.length > 0 &&
                        <Icon 
                            class="form__input_clear-icon icon icon_size_m icon_clear"
                            handler={clearRepo}
                        />
                    }
                </div>
            </div>
            <div className="form__build-command form__group">
                <div className="form__label">
                    <Text class="text text_size_m text_inline" content="Build command" />
                    <Text class="text text_margin_inline_s text_required text_inline" content="*" />
                </div>
                <div className="form__input">
                    <Input 
                        type="text" 
                        inputClasses={"input input_text text text_size_m " + commandValidationError} 
                        placeholder="npm run build"
                        defaultValue={buildCommand}
                        handler={handleCommandChange} 
                    />
                    {buildCommand.length > 0 &&
                        <Icon 
                            class="form__input_clear-icon icon icon_size_m icon_clear"
                            handler={clearCommand}
                        />
                    }
                </div>
            </div>
            <div className="form__main-branch form__group">
                <div className="form__label">
                <Text class="text text_size_m" content="Main branch" />
                </div>
                <div className="form__input">
                    <Input 
                        type="text" 
                        inputClasses="input input_text text text_size_m"
                        placeholder="master"
                        defaultValue={mainBranch}
                        handler={handleBranchChange}
                    />
                    {mainBranch.length > 0 &&
                        <Icon 
                            class="form__input_clear-icon icon icon_size_m icon_clear"
                            handler={clearBranch}
                        />
                    }
                </div>
            </div>
            <div className="form__synchronize-block">
                <div className="text text_size_m">
                    <Text class="text text_size_m text_inline" content="Synchronize every" />
                    <Input 
                        type="number" 
                        inputClasses="input input_number text text_size_m" 
                        placeholder="15"
                        defaultValue={period}
                        handler={handlePeriodChange}
                    />
                    <Text class="text text_size_m text_inline" content="minutes" />
                </div>
            </div>
            <div className="form__buttons">
                <Input 
                    isText
                    disabled={disabled}
                    type="submit"
                    inputClasses="form__btn_save"
                    buttonClasses="button button_success button_size_m"
                    textClasses="text text_size_m text_margin_m"
                    content="Save"
                    handler={handleSubmit}
                    />
                <Input 
                    isText
                    disabled={disabled}
                    type="submit"
                    inputClasses="form__btn_cancel"
                    buttonClasses="button button_primary button_size_m"
                    textClasses="text text_size_m text_margin_m"
                    content="Cancel"
                    handler={handleCancel}
                    />
            </div>
        </div>
    ); 
}

export default Form;