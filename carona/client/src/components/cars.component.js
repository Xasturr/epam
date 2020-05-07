import React, { Component } from 'react';
import axios from 'axios';
import Footer from './footer.component';
import CarList from './car-list.component';
import config from '../config/config';
const url = config.url;

export default class Cars extends Component {

    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onChangeYearFrom = this.onChangeYearFrom.bind(this);
        this.onChangeYearTo = this.onChangeYearTo.bind(this);
        this.onClear = this.onClear.bind(this);

        this.state = {
            cars: [],
            loading: true,
            brand: '',
            model: '',
            brands: [],
            models: [],
            class: '',
            yearFrom: '',
            yearTo: ''
        }
    }

    componentDidMount() {
        document.title = "Cars";

        axios.get(url + '/cars')
            .then(res => {
                this.setState({ cars: res.data });
                this.setState({ loading: false });

                return axios.get(url + '/brands');
            })
            .then(res => {
                console.log(url + '/brands');
                console.log(res);
                this.setState({ brands: res.data });
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in cars.component\n", err);
            })
    }

    onChangeBrand(e) {
        e.preventDefault();
        const b = e.target.value;
        this.setState({ brand: b });
        if (b.length > 0) {
            axios.get(url + '/brands/' + b)
                .then(res => {
                    // console.log(url + '/brands/' + b);
                    // console.log(res);
                    this.setState({ models: res.data[0].models });
                })
                .catch(err => {
                    this.setState({ models: [] });
                    // console.log("An error occured in modelChoose in cars.component\n", err);
                })
        }
    }

    Brands() {
        return this.state.brands.map(brand => {
            return (
                <option key={brand} value={brand.brand} />
            )
        })
    }

    Models() {
        if (this.state.models.length === 0 || this.state.brand.length === 0)
            return <option value="Please, choose brand correctly" />
        else
            return this.state.models.map(model => {
                return (
                    <option key={model} value={model} />
                )
            })
    }

    onSearch(e) {
        e.preventDefault();

        const params = {
            brand: this.state.brand,
            model: this.state.model,
            class: this.state.class,
            yearFrom: this.state.yearFrom,
            yearTo: this.state.yearTo
        };

        axios.post(url + '/cars/search', params)
            .then(res => {
                return this.setState({
                    cars: res.data,
                    loading: true
                });
            })
            .then(res => {
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log("An error occured in onModel in cars.component\n", err);
            })
    }

    onChangeModel(e) {
        this.setState({ model: e.target.value });
    }

    onChangeClass(e) {
        this.setState({ class: e.target.value });
    }

    onChangeYearFrom(e) {
        this.setState({ yearFrom: e.target.value });
    }

    onChangeYearTo(e) {
        this.setState({ yearTo: e.target.value });
    }

    onClear(e) {
        this.setState({
            brand: '', model: '', class: '', yearTo: '', yearFrom: ''
        });
    }

    render() {

        const imgStyle = {
            verticalAlign: 'sub',
        };

        return (
            <div className="wrapper">
                <div className="cars">
                    <div className="sidenav">
                        {/* <form> */}
                        <p className="sidenav__element">Brand</p>
                        <input className="sidenav__input" value={this.state.brand} list="brands" name="brand" placeholder="Choose" onChange={this.onChangeBrand}>
                        </input>
                        <datalist id="brands">
                            {this.Brands()}
                            {/* <option value="Bentley" /> */}
                            {/* <option value="BMW" /> */}
                        </datalist>
                        <p className="sidenav__element">Models</p>
                        <input className="sidenav__input" value={this.state.model} list="models" name="model" placeholder="Choose" onChange={this.onChangeModel}>
                        </input>
                        <datalist id="models">
                            {this.Models()}
                        </datalist>
                        <p className="sidenav__element">Class</p>
                        <input className="sidenav__input" value={this.state.class} list="classes" name="classes" placeholder="Choose" onChange={this.onChangeClass}>
                        </input>
                        <datalist id="classes">
                            <option value="Economy" />
                            <option value="Business" />
                            <option value="Premium" />
                        </datalist>
                        <p className="sidenav__element">Year</p>
                        <div className="sidenav__element__year">
                            <input className="sidenav__input" value={this.state.yearFrom} name="year_from" placeholder="From" onChange={this.onChangeYearFrom}>
                            </input>
                            <input className="sidenav__input" value={this.state.yearTo} name="year_to" placeholder="To" onChange={this.onChangeYearTo}>
                            </input>
                        </div>
                        <div className="sidenav__element__btn">
                            <input type="submit" value="Search" className="sidenav__button" onClick={this.onSearch} />
                            <input type="submit" value="Clear" className="sidenav__button" onClick={this.onClear} />
                        </div>
                        {/* </form> */}
                    </div>
                    <div className="cars__content">
                        <div className="cars__search">
                            {/* <div className="cars__search__el"> */}
                            <input type="text" className="cars__input" required />
                            {/* </div> */}
                            <div className="cars__search__el">
                                <form>
                                    <button className="btn__dark" >
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