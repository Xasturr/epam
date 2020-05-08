import React, { Component } from 'react';
import GoogleMap from './googlemap.component';
import axios from 'axios';
import ContactList from './contact-list.component';
import config from '../config/config';
const url = config.url;

export default class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            loading: true
        }
    }

    componentDidMount() {
        document.title = "Contacts";

        axios.get(url + window.location.pathname)
            .then(res => {
                this.setState({ contacts: res.data });
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in contacts.component\n", err);
            })
    }

    render() {
        return (
            <div className="wrapper">
                {this.state.loading ? '' :
                    <div>
                        <div className="contact__body">
                            <div id="map">
                                <GoogleMap /><br />
                            </div>
                            <p className="title_text">CONTACTS INFO</p>
                            <ContactList contacts={this.state.contacts} />
                            <p className="title_text">OPENING HOURS</p>
                            <div className="contact__opening-hours">
                                <p className="textStyle">Mon-Fri : 08:00 - 22:00<br />Sat-Sun : 10:00 - 21:00</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}