import React, { Component } from 'react';
import Weather from "./weather.component";

export default class WeatherList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weathers: this.props.weathers,
        }
    }

    WeatherList() {
        return this.state.weathers.map(weather => {
            return (
                <li className="weather__li" key={weather.id}>
                    <Weather weather={weather} />
                </li>
            )
        })
    }


    render() {
        return (
            <div>
                <ul className="weather__ul">
                    {this.WeatherList()}
                </ul>
            </div>
        )
    }
}