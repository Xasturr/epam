import React, { Component } from 'react';
import Car from "./car.component";

export default class CarList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cars: this.props.cars,
        }
    }

    CarList() {
        return this.state.cars.map(car => {
            return (
                <li className="car-list__li" key={car._id}>
                    <Car car={car} />
                </li>
            )
        })
    }

    render() {
        return (
            <div className="car-list__list">
                <ul className="car-list__ul">
                    {this.CarList()}
                </ul>
            </div>
        )
    }
}