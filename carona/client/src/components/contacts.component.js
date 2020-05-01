import React, { Component } from 'react';
import GoogleMap from './googlemap.component';
import Footer from './footer.component';

export default class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        document.title = "Carona";

    }

    render() {
        return (
            <div className="wrapper">
                {/* <div className="google-map">
                    <GoogleMap/><br/>
                </div> */}
                <Footer/>
            </div>
        )
    }
}