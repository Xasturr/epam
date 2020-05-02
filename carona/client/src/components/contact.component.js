import React, { Component } from 'react';

export default class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.id,
            fullname: this.props.fullname,
            image: this.props.image,
            phonenum: this.props.phonenum,
            email: this.props.email
        }
    }

    render() {
        return (
            <div className="contact__dark">
                <div className="image-cropper">
                    <img className="contact__img" src={this.state.image} alt="contact"></img>
                </div>
                <div className="contact__info">
                    <div className="contact__subinfo"><span className="contact__text-style">Fullname: {this.state.fullname}</span></div>
                    <div className="contact__subinfo"><span className="contact__text-style">Phone number: {this.state.phonenum}</span></div>
                    <div className="contact__subinfo"><span className="contact__text-style">Email: {this.state.email}</span></div>
                </div>
            </div>
        )
    }
}