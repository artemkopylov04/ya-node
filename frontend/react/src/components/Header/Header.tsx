import React from 'react';
import './Header.scss';

interface Header {
  title: React.ReactNode,
  buttons?: React.ReactFragment
}

const Header: React.FC<Header> = ({title, buttons}) => {
  return (
    <div className="header">
        <div className="header__container">
        <div className="header__title">
            {title}
        </div>
        <div className="header__buttons">
            {buttons}
        </div>
        </div>
    </div>
  );
}

export default Header;
