import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import './Popup.scss';

function Popup(props) {

    const history = useHistory();

    const [hash, setHash] = useState('');
    const handleHashChange = (event) => setHash(event.target.value);
    const clearHash = () => setHash('');

    const [disabled, setDisabled] = useState(false);

    const handleSubmit = (event) => {
        setDisabled(true);
        axios.post(
            `/api/builds/${hash}`,
          )
          .then(({data}) => {
            if (data && data.data && data.data.id) {
                history.push(`/build/${data.data.id}`);
            }
          })
          .catch(e => console.error(e));
    }

    return (
        <div className={"popup__layout popup_state_" + props.isOpen}>
            <div className="popup">
                <div className="popup__container">
                    <Text class="popup__title" content="New build" />
                    <Text class="popup__description text text_size_m" content="Enter the commit hash which you want to build." />
                    <div className="popup__hash">
                        <Input 
                            type="text" 
                            inputClasses="input input_text text text_size_m"
                            placeholder="Commit hash"
                            defaultValue={hash}
                            handler={handleHashChange} 
                        />
                        {hash.length > 0 &&
                            <Icon 
                                class="form__input_clear-icon icon icon_size_m icon_clear"
                                handler={clearHash}
                            />
                        }
                    </div>
                    <div className="form__buttons">
                        <Input 
                            isText
                            disabled={disabled}
                            type="submit"
                            inputClasses="form__btn_save popup__run"
                            buttonClasses="button button_success button_size_m"
                            textClasses="text text_size_m text_margin_m"
                            content="Run build"
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
                            handler={props.cancelHandler}
                            />
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default Popup;