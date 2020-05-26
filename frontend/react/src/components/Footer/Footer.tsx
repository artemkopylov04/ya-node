import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import './Footer.scss';
import { useDispatch } from 'react-redux';
import { changeLang as cL } from '../../store/actions';


function Footer() {

  const dispatch = useDispatch();

  const changeLang = () => dispatch(cL());

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__menu">
          <div className="footer__link">
            <Button
              color="link"
              size="s"
              text={
                <Text messageId="support" content="Support" />
              }
            />
          </div>
          <div className="footer__link">
            <Button
              color="link"
              size="s"
              text={
                <Text messageId="learning" content="Learning" />
              }
            />
          </div>
          <div className="footer__link">
            <Button
              color="link"
              size="s"
              text={
                <Text messageId="changeLang" content="Русская версия" />
              }
              onClick={changeLang}
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
