import React, { Component } from 'react';
import axios from 'axios';
import Footer from './footer.component';
import CarList from './car-list.component';
import config from '../config/config';
const url = config.url;

export default class Cars extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cars: [],
            loading: true
        }
    }

    componentDidMount() {
        document.title = "Cars";

        axios.get(url + window.location.pathname)
            .then(res => {
                console.log(res.data);
                this.setState({ cars: res.data });
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in cars.component\n", err);
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
                        <input list="brands" name="brand" placeholder="Choose">
                        </input>
                        <datalist id="brands">
                            <option value="Internet Explorer" />
                            <option value="Firefox" />
                            <option value="Chrome" />
                            <option value="Opera" />
                            <option value="Safari" />
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