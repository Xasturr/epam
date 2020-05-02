import React, { Component } from 'react';
import instagram_logo from '../images/Instagram-Icon.png';
import telegram_logo from '../images/Telegram-Icon.png';
import youtube_logo from '../images/YouTube-Icon.png';

export default class Footer extends Component {

    render() {

        return (
            <div className="wrapper">
                <hr className="horline"></hr>
                <div className="footer__content">
                    <span className="footer__inc">© 2020 Carona, Inc.</span>
                    <ul className="footer__ul">
                        <li className="footer__li"><a className="footer__link" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/xasturr/"><img src={instagram_logo} className="footer__img" alt="telegram logo"></img></a></li>
                        <li className="footer__li"><a className="footer__link" target="_blank" rel="noopener noreferrer" href="https://t.me/XP0M0C0MA"><img src={telegram_logo} className="footer__img" alt="instagram logo"></img></a></li>
                        <li className="footer__li"><a className="footer__link" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCoAhQTkNhR2uW5xe3aaWkbw?view_as=subscriber"><img src={youtube_logo} className="footer__img" alt="youtube logo"></img></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}