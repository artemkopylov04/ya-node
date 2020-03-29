import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import './Form.scss';

function Form(props) {
    const [repoName, setRepoName] = useState('');
    const [buildCommand, setBuildCommand] = useState('');
    const [mainBranch, setMainBranch] = useState('');
    const [period, setPeriod] = useState('');

    const handleRepoChange = (event) => setRepoName(event.target.value);
    const handleCommandChange = (event) => setBuildCommand(event.target.value);
    const handleBranchChange = (event) => setMainBranch(event.target.value);
    const handlePeriodChange = (event) => setPeriod(event.target.value);

    return (
        <div className="form flex flex_direction_column">
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
                <Input 
                    type="text" 
                    inputClasses="input input_text text text_size_m" 
                    placeholder="user-name/repo-name"
                    defaultValue={repoName}
                    handler={handleRepoChange} 
                />
            </div>
            <div className="form__build-command form__group">
                <div className="form__label">
                    <Text class="text text_size_m text_inline" content="Build command" />
                    <Text class="text text_margin_inline_s text_required text_inline" content="*" />
                </div>
                <div className="form__input">
                    <Input 
                        type="text" 
                        inputClasses="input input_text text text_size_m" 
                        defaultValue={buildCommand}
                        handler={handleCommandChange} 
                    />
                    <Icon class="form__input_clear-icon icon icon_size_m icon_clear"/>
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
                        defaultValue={mainBranch}
                        handler={handleBranchChange}
                    />
                    <Icon class="form__input_clear-icon icon icon_size_m icon_clear"/>
                </div>
            </div>
            <div className="form__synchronize-block">
                <div className="text text_size_m">
                    <Text class="text text_size_m text_inline" content="Synchronize every" />
                    <Input 
                        type="number" 
                        inputClasses="input input_number text text_size_m" 
                        defaultValue={period}
                        handler={handlePeriodChange}
                    />
                    <Text class="text text_size_m text_inline" content="minutes" />
                </div>
            </div>
            <div className="form__buttons flex flex_mobile_direction_column">
                <Link className="text_decoration_none" to="/">
                    <Input 
                        isText
                        type='submit'
                        inputClasses="form__btn_save"
                        buttonClasses="button button_success button_size_m"
                        textClasses="text text_size_m text_margin_m"
                        content="Save"
                        />
                </Link>
                <Link className="text_decoration_none" to="/">
                    <Input 
                        isText
                        type='submit'
                        inputClasses="form__btn_cancel"
                        buttonClasses="button button_primary button_size_m"
                        textClasses="text text_size_m text_margin_m"
                        content="Cancel"
                        />
                </Link>
            </div>
        </div>
    ); 
}

export default Form;