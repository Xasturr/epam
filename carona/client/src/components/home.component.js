import React, { Component } from 'react';
import axios from 'axios';
import config from '../config/config';
const url = config.url;

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            photoes: []
        }
    }

    componentDidMount() {
        document.title = "Carona";

        axios.get(url + window.location.pathname)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log("An error occured in componentDidMount in home.component\n", err);
                })
        }

        render() {
            return (
                <div className="container">
                    <p id="textStyle">Вас вітає сайт <b>Out Of Lag</b>! Якщо автомобіль для вас - це не просто чотири колеса та сидіння, якщо ви відчуваєте,
                що іноді від цих сталевих коней неможливо відірвати погляд, якщо вам до вподоби палкий спів японських роторів, чи рев
                могутніх американських V8, або просто завітали почитаті цікаві блоги, то цей сайт для вас! Якщо ви маєте цікавий досвід
                у володінні свого металевого друга, можете ним поділитися із усіма читачами, або ж якщо ви просто хочете почитати статті
              інших водіїв, ласкаво просимо!</p>
                </div>
            )
        }
    }