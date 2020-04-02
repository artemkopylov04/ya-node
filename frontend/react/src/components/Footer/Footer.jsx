import React from 'react';
import Button from '../Button/Button';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__menu">
          <Button
            isText
            buttonClasses="footer__link button button_link button_size_s"
            textClasses="text text_size_m"
            content="Support"
          />
          <Button
            isText
            buttonClasses="footer__link button button_link button_size_s"
            textClasses="text text_size_m"
            content="Learning"
          />
        </div>
        <div className="footer__rights">
          <Button
            isText
            buttonClasses="footer__link button button_link_disabled button_size_s"
            textClasses="text text_size_m"
            content="© 2020 Your Name"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
