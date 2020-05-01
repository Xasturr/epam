import React, { Component } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Footer from './footer.component';
import config from '../config/config';
const url = config.url;

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            images: []
        }
    }

    componentDidMount() {
        document.title = "Carona";

        axios.get(url + window.location.pathname)
            .then(res => {
                this.setState({ images: res.data[0].images });
                console.log(res.data[0].images);
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in home.component\n", err);
            })
    }

    CarouselImages() {
        let images = [];

        for (let i = 0; i < this.state.images.length; i++) {
            images.push(<Carousel.Item key={i}>
                <img
                    className="d-block w-100"
                    src={this.state.images[i]}
                    alt="car image"
                />
            </Carousel.Item>);
        }
        return images;
    }

    render() {

        const carousel = (
            <Carousel interval="2000" indicators={false}>
                {this.CarouselImages()}
            </Carousel>
        )

        return (
            < div className="wrapper">
                {carousel}
                <p className="textStyle">
                    Hello World! Hello World! Hello World! Hello World!
                    Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!
                    Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!
                    Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!
                    Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!
                    Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!
                    Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!
                    Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!
                </p>
                <Footer/>
            </div >
        )
    }
}