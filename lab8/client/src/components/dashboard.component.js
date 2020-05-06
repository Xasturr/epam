import React, { Component } from 'react';
import axios from 'axios';
import WeatherList from "./weather-list.component";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: '',
            weathers: [],
            loading: true
        }
    }

    componentDidMount() {
        document.title = "Dashboard";

        axios.get("https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/924938/")
            .then(res => {
                console.log(res);
                this.setState({
                    weathers: res.data.consolidated_weather,
                    location: res.data.parent.title + ' ' + res.data.title,
                    loading: false
                });
            })
            .catch(err => {
                console.log("An error occured in modelChoose in dashboard.component\n", err);
            })
    }

    render() {
        return (
            <div className="cont">

                {this.state.loading ? '' :
                    <>
                        <h1><span className="textStyle">{this.state.location}</span></h1>
                        <WeatherList weathers={this.state.weathers} />
                    </>
                }
            </div>
        )
    }
}