import React, { Component } from 'react';
import axios from 'axios';
import Footer from './footer.component';
import CarList from './car-list.component';
import config from '../config/config';
const url = config.url;

export default class Cars extends Component {

    constructor(props) {
        super(props);

        this.brandChoose = this.brandChoose.bind(this);
        this.modelChoose = this.modelChoose.bind(this);
        this.inputUnodify = this.modelsInputUnodify.bind(this);

        this.state = {
            cars: [],
            loading: true,
            brand: '',
            model: '',
            models: []
        }
    }

    componentDidMount() {
        document.title = "Cars";

        axios.get(url + window.location.pathname)
            .then(res => {
                this.setState({ cars: res.data });
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in cars.component\n", err);
            })
    }

    brandChoose(e) {
        e.preventDefault();
        this.setState({ brand: e.target.value });
        if (e.target.value.length > 0) {
            axios.get(url + '/brands/' + this.state.brand)
                .then(res => {
                    console.log(url + '/brands/' + this.state.brand);
                    console.log(res);
                    this.setState({ models: res.data[0].models });
                })
                .catch(err => {
                    console.log("An error occured in modelChoose in cars.component\n", err);
                })
        }
    }

    modelChoose(e) {
        e.preventDefault();
        // if (this.state.brand.length > 0) {
        //     axios.get(url + '/brands/' + this.state.brand)
        //         .then(res => {
        //             console.log(res.data[0].models);
        //             this.setState({ models: res.data[0].models });
        //         })
        //         .catch(err => {
        //             console.log("An error occured in modelChoose in cars.component\n", err);
        //         })
        // }
        // else
        // e.target.disabled = true;
    }

    modelsInputUnodify(e) {
        // e.target.value =
    }

    Models() {
        return this.state.models.map(model => {
            return (
                <option key={model} value={model} onChange={this.brandChoose} />
            )
        })
    }

    render() {

        const imgStyle = {
            verticalAlign: 'sub',
        };

        return (
            <div className="wrapper">
                <div className="cars">
                    <div className="sidenav">
                        <p className="sidenav__element">Brand:</p>
                        <input list="brands" name="brand" placeholder="Choose" onInput={this.brandChoose}>
                        </input>
                        <datalist id="brands">
                            <option value="Bentley" />
                            <option value="BMW" />
                        </datalist>
                        <input list="models" name="model" placeholder="Choose" onClick={this.modelChoose}>
                        </input>
                        <datalist id="models">
                            {this.Models()}
                        </datalist>
                    </div>
                    <div className="cars__content">
                        <div className="cars__search">
                            {/* <div className="cars__search__el"> */}
                            <input type="text" className="cars__input" required />
                            {/* </div> */}
                            <div className="cars__search__el">
                                <form>
                                    <button className="btn__dark" onClick={this.onSearch}>
                                        <img style={imgStyle} src="https://res.cloudinary.com/hhiefmflq/image/upload/v1588535979/Carona/icons/search_l2ln7h.png" width="20" height="20" alt="search" />
                                    </button>
                                </form>
                            </div>
                        </div >
                        {this.state.loading ? '' :
                            <CarList cars={this.state.cars} />
                        }
                    </div>
                </div>
                {/* <CarList contacts={this.state.cars} /> */}
                <Footer />
            </div >
        )
    }
}