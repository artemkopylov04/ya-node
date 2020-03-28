import React from 'react';
import Text from '../../components/Text/Text';
import Input from '../../components/Input/Input';
import './Settings.scss';

function Start(props) {
  return (
    <div className="content">
        <div className="header">
            <div className="header__container">
                <div className="header__title">
                    <Text class="text text_size_xl text_color_title" content="School CI server" />
                </div>
            </div>
        </div>
        <div className="main">
            <div className="main__container settings">
                <div class="form flex flex_direction_column">
                    <div class="form__title">
                        <div class="text text_size_l text_wrap">Settings</div>
                    </div>
                    <div class="form__description">
                        <div class="text text_size_m text_wrap">
                            Configure repository connection and synchronization settings.
                        </div>
                    </div>
                    <div class="form__github-repo form__group">
                        <div class="form__label">
                            <div class="text text_size_m">
                                GitHub repository <span class="text text_required">*</span>
                            </div>
                        </div>
                        <input type="text" class="input input_text text text_size_m" placeholder="user-name/repo-name" />
                    </div>
                    <div class="form__build-command form__group">
                        <div class="form__label">
                            <div class="text text_size_m">Build command</div>
                        </div>
                        <div class="form__input">
                            <input type="text" class="input input_text text text_size_m" />
                            <div class="form__input_clear-icon icon icon_size_m icon_clear"></div>
                        </div>
                    </div>
                    <div class="form__main-branch form__group">
                        <div class="form__label">
                            <div class="text text_size_m">Main branch</div>
                        </div>
                        <div class="form__input">
                            <input type="text" class="input input_text text text_size_m" />
                            <div class="form__input_clear-icon icon icon_size_m icon_clear"></div>
                        </div>
                    </div>
                    <div class="form__synchronize-block">
                        <div class="text text_size_m">
                            Synchronize every
                            <input type="number" max="60" min="1" value="10" class="input input_number text text_size_m" />
                            minutes
                        </div>
                    </div>
                    <div class="form__buttons flex flex_mobile_direction_column">
                        <Input 
                            isText
                            submit
                            inputClasses="form__btn_save"
                            buttonClasses="button button_success button_size_m"
                            textClasses="text text_size_m text_margin_m"
                            content="Save"
                            />
                        <Input 
                            isText
                            submit
                            inputClasses="form__btn_cancel"
                            buttonClasses="button button_primary button_size_m"
                            textClasses="text text_size_m text_margin_m"
                            content="Cancel"
                            />
                    </div>
                </div>
            </div> 
        </div>
    </div>
  );
}

export default Start;