import React from 'react';
import Text from '../../components/Text/Text';
import Form from '../../components/Form/Form';
import './Settings.scss';

function Settings(props) {
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
            <div className="main__container">
                <Form />
            </div> 
        </div>
    </div>
  );
}

export default Settings;