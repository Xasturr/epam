import React, { Component } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
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
                    alt="car"
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
                <p className="title_text"><span className="title_span">WHO WE ARE</span></p>
                <div className="container">
                    <div className="textStyle">
                        <div className="info">
                            <span className="par">Would</span> you like to enjoy your holidays, and not even think about taxi prices or bus
                            schedules? Isn’t it cool to find the rental car right after your arrival in front
                            of you terminal? And what about visiting some remote places, driving through
                            hidden trails or having a dinner in the restaurants with a view, impossible to
                            get to by taking public transport? All of these and even more advantages you will
                            find with <b>Carona</b>.<br />
                            <span className="par">Who</span> we are? is a car rental company, which provides vehicles of various classes
                            in Ukraine <b>since 2013</b>. Our main office is situated in <b>Kyiv</b>, but we also have branch
                            offices in <b>Lviv, Odessa and Dnipro</b>.
                            Which services can you get? We provide car rental both with and without a driver with
                            an opportunity to pick you up at the Borispol airport or the Kyiv airport (Zhuliany) and a guarantee for a free wait
                            for you up to 60 minutes in case of unforeseen circumstances. Services have a fixed price that is independent of any factors.
                            Our rental agency also arranges transfers from the regions to Kyiv and between other
                            human settlements. Furthermore, you can rent a car for one day. Our prices are the
                            best in the capital. And you can also save your money, booking a car in advance.
                            Our car rental service can be paid in cash, cashless, and with Visa card or
                            MasterCard.<br />
                            <span className="par">What</span> cars do we offer? <b>Carona</b> can provide any vehicle under your request. Our fleet
                            counts <b>more than 100 cars</b>. It’s possible to rent a car of any class: cheap economy
                            class cars, business class ones, VIP class cars or vans. <b>All the vehicles are
                            insured and in running order, with a full tank and a 24-hour technical support
                            service</b>. Moreover, the cars are <b>not older than 4 years old</b>.
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}