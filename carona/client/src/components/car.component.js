import React, { Component } from 'react';
import config from '../config/config';
const url = config.client;

export default class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.car._id,
            brand: this.props.car.brand,
            model: this.props.car.model,
            year: this.props.car.year,
            country: this.props.car.country,
            class: this.props.car.class,
            image: this.props.car.images[0],
            price: this.props.car.price
        }
    }

    render() {

        const mainCarInfo = this.state.brand + " " + this.state.model + " " + this.state.year;
        const carURL = url + "/cars/" + this.state.id;

        return (
            <div className="car-list__dark">
                <div className="car-list__img-cropper">
                    <img className="car-list__img" src={this.state.image} alt="car"></img>
                </div>
                <div className="car-list__info">
                    <div className="car-list__info__main"><a className="car-list__text-style__main" href={carURL}>{mainCarInfo}</a></div>
                    <div className="car-list__subinfo"><span className="car-list__text-style">Price: {this.state.price}</span></div>
                    <div className="car-list__subinfo"><span className="car-list__text-style">Country: {this.state.country}</span></div>
                    <div className="car-list__subinfo"><span className="car-list__text-style">Class: {this.state.class}</span></div>
                </div>
            </div>
        )
    }
}