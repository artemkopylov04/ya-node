import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__menu">
          <div className="footer__link">
            <Button
              color="link"
              size="s"
              text={
                <Text content="Support" />
              }
            />
          </div>
          <div className="footer__link">
            <Button
              color="link"
              size="s"
              text={
                <Text content="Learning" />
              }
            />
          </div>
        </div>
        <div className="footer__rights">
          <div className="footer__link">
            <Button
              color="link_disabled"
              size="s"
              text={
                <Text content="© 2020 Your Name" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
