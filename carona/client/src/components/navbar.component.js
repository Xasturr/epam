import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() { }

    render() {

        return (
            <nav className="uppernav">
                <ul className="uppernav__ul">
                    <li className="uppernav__li"><a className="uppernav__logo" href="/home">Carona</a></li>
                    <li className="uppernav__li">
                        <div className="dropdown">
                            <a href="/cars">
                                <button className="dropbtn">Cars</button>
                            </a>
                            <div className="dropdown-content">
                                <a className="dropdown-link" href="/cars?class=Premium">Premium</a>
                                <a className="dropdown-link" href="/cars?class=Business">Business</a>
                                <a className="dropdown-link" href="/cars?class=Economy">Economy</a>
                            </div>
                        </div>
                    </li>
                    <li className="uppernav__li"><a className="uppernav__link" href="/contacts">Contacts</a></li>
                </ul>
            </nav>
        )
    }
}

export default (Navbar)