import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {}

    render() {

        return (
            <nav className="uppernav">
                <ul>
                    <li className="uppernav__li"><a className="uppernav__logo" href="/home">Carona</a></li>
                    <li className="uppernav__li"><a className="uppernav__link" href="/home">Home</a></li>
                    <li className="uppernav__li"><a className="uppernav__link" href="/cars">Cars</a></li>
                    <li className="uppernav__li"><a className="uppernav__link" href="/contacts">Contacts</a></li>
                </ul>
            </nav>
        )
    }
}

export default (Navbar)