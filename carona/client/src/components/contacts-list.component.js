import React, { Component } from 'react';
import Contact from "./contact.component";

export default class ContactsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: this.props.contacts,
        }
    }

    ContactsList() {
        return this.state.contacts.map(contact => {
            return (
                <li className="contact__li" key={contact._id}>
                    <Contact id={contact._id} fullname={contact.fullname}
                        image={contact.image} phonenum={contact.phonenum} email={contact.email} />
                </li>
            )
        })
    }

    render() {
        return (
            <div className="contactList">
                <ul className="contact__ul">
                    {this.ContactsList()}
                </ul>
            </div>
        )
    }
}