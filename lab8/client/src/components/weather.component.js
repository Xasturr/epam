import React, { Component } from 'react';

export default class Contacts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.weather._id,
            weather_state_name: this.props.weather.weather_state_name,
            weather_state_abbr: this.props.weather.weather_state_abbr,
            wind_direction_compass: this.props.weather.wind_direction_compass,
            created: this.props.weather.created,
            applicable_date: this.props.weather.applicable_date,
            min_temp: this.props.weather.min_temp,
            max_temp: this.props.weather.max_temp,
            the_temp: this.props.weather.the_temp,
            wind_speed: this.props.weather.wind_speed,
            wind_direction: this.props.weather.wind_direction,
            air_pressure: this.props.weather.air_pressure,
            humidity: this.props.weather.humidity,
            visibility: this.props.weather.visibility,
            predictability: this.props.weather.predictability
        }
    }

    render() {

        return (
            <div className="weather-list">
                <ul className="weather-list__ul">
                    <li className="weather-list__il"><b className="textStyle">{this.state.applicable_date}</b></li>
                    <li className="weather-list__il"><span className="textStyle">{this.state.weather_state_name}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Wind direction: {this.state.wind_direction_compass}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Min temp: {this.state.min_temp.toFixed(0)}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Max temp: {this.state.max_temp.toFixed(0)}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Temp: {this.state.the_temp.toFixed(0)}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Wind speed: {this.state.wind_speed.toFixed(0)}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Pressure: {this.state.air_pressure.toFixed(0)}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Humidity: {this.state.humidity.toFixed(0)}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Visibility: {this.state.visibility.toFixed(0)}</span></li>
                    <li className="weather-list__il"><span className="textStyle">Confidence: {this.state.predictability}%</span></li>
                </ul>
            </div>
        )
    }
}