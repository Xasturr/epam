import React, { Component } from 'react';
import axios from 'axios';
import CarList from './car-list.component';
import Optbar from './optbar.component';
import config from '../config/config';
const url = config.url;

export default class Cars extends Component {

    constructor(props) {
        super(props);

        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.onSpecClick = this.onSpecClick.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearchBtnClick = this.onSearchBtnClick.bind(this);

        this.state = {
            allCars: [],
            cars: [],
            loading: true,
            brand: '',
            model: '',
            brands: [],
            models: [],
            class: '',
            country: '',
            countries: [],
            yearFrom: '',
            yearTo: '',
            sorting: 'Brand from A to Z',
            specs: 'close',
            searchInput: ''
        }
    }

    componentDidMount() {
        document.title = "Cars";

        axios.get(url + '/cars')
            .then(res => {

                res.data.sort(function (a, b) {
                    if (a.brand < b.brand)
                        return -1;
                    if (b.brand < a.brand)
                        return 1;
                    return 0;
                });

                this.setState({
                    allCars: res.data,
                    cars: res.data
                });

                let countries = [];
                let brands = [];

                for (let i = 0; i < res.data.length; i++) {
                    if (countries.indexOf(res.data[i].country) === -1)
                        countries.push(res.data[i].country);
                    if (brands.indexOf(res.data[i].brand) === -1)
                        brands.push(res.data[i].brand);
                }

                this.setState({ countries: countries });
                this.setState({ brands: brands });
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in cars.component\n", err);
            })
    }

    Brands() {
        let i = 0
        return this.state.brands.map(brand => {
            return (
                <option key={i++} value={brand} />
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

    Countries() {
        let i = 0
        return this.state.countries.map(country => {
            return (
                <option key={i++} value={country} />
            )
        })
    }

    onChangeBrand(e) {
        e.preventDefault();
        const b = e.target.value;
        this.setState({ brand: b });
        if (b.length > 0) {
            let models = [];
            let allCars = this.state.allCars;
            for (let i = 0; i < allCars.length; i++) {
                if (allCars[i].brand.toLowerCase() === b.toLowerCase())
                    models.push(allCars[i].model);
            }
            this.setState({ models: models });
        }
    }

    onChangeSorting(e) {
        let cars = this.state.cars;
        cars = this.sortCars(cars, e.target.value);
        this.setState({ cars: cars })
        this.setState({ sorting: e.target.value });
    }

    sortCars(cars, opt) {
        if (opt === "Brand from A to Z") {
            cars.sort(function (a, b) {
                if (a.brand < b.brand)
                    return -1;
                if (b.brand < a.brand)
                    return 1;
                return 0;
            });
        }
        else if (opt === "Brand from Z to A") {
            cars.sort(function (a, b) {
                if (a.brand > b.brand)
                    return -1;
                if (b.brand > a.brand)
                    return 1;
                return 0;
            });
        }
        else if (opt === "Year, descending") {
            cars.sort(function (a, b) {
                if (a.year > b.year)
                    return -1;
                if (b.year > a.year)
                    return 1;
                return 0;
            });
        }
        else {
            cars.sort(function (a, b) {
                if (a.year < b.year)
                    return -1;
                if (b.year < a.year)
                    return 1;
                return 0;
            });
        }
        return cars;
    }

    onSpecClick(e) {
        if (this.state.specs === 'open') {
            this.setState({ specs: 'close' });
            document.getElementsByClassName("optbar")[0].style.height = "0px";
        }
        else {
            this.setState({ specs: 'open' });
            document.getElementsByClassName("optbar")[0].style.height = "220px";
        }
    }

    onSearchInputChange(e) {
        this.setState({ searchInput: e.target.value });
    }

    onSearchBtnClick(e) {
        let searchInput = this.state.searchInput;
        const allCars = this.state.allCars;
        this.setState({ loading: true }, () => {
            if (searchInput) {
                let cars = [];
                let brandModel = '';
                for (let i = 0; i < allCars.length; i++) {
                    brandModel = allCars[i].brand + ' ' + allCars[i].model + ' ' + allCars[i].year;
                    if (brandModel.toLocaleLowerCase().includes(searchInput.toLowerCase()))
                        cars.push(allCars[i]);
                }
                this.setState({ cars: this.sortCars(cars, this.state.sorting) }, () => {
                    this.setState({ loading: false });
                })
            }
            else {
                this.setState({ cars: this.sortCars(allCars, this.state.sorting) }, () => {
                    this.setState({ loading: false });
                });
            }
        });
    }

    carsArrayFromOptbar = (cars) => {
        document.getElementsByClassName("optbar")[0].style.height = "220px";
        this.setState({ cars: this.sortCars(JSON.parse(cars), this.state.sorting), loading: true }, () => {
            this.setState({ loading: false });
        });
    }

    render() {

        const imgStyle = {
            verticalAlign: 'sub',
        };

        return (
            <div className="wrapper">
                <div className="cars">
                    <div className="cars__content">
                        <div className="cars__search">
                            <input type="text" className="cars__input" onChange={this.onSearchInputChange} />
                            <div className="cars__search__el">
                                <button className="btn__dark" onClick={this.onSearchBtnClick}>
                                    <img style={imgStyle} src="https://res.cloudinary.com/hhiefmflq/image/upload/v1588535979/Carona/icons/search_l2ln7h.png" width="20" height="20" alt="search" />
                                </button>
                            </div>
                        </div >
                        <div className="sorting">
                            <p className="sorting__text">Sorting: </p>
                            <select className="sorting__select" onChange={this.onChangeSorting}>
                                <option value="Brand from A to Z">Brand from A to Z</option>
                                <option value="Brand from Z to A">Brand from Z to A</option>
                                <option value="Year, descending">Year, descending</option>
                                <option value="Year, ascending">Year, ascending</option>
                            </select>
                            <p className="sorting__spec" onClick={this.onSpecClick}>Specify options &#9776;</p>
                        </div>

                        {(this.state.brands.length) ?
                            < Optbar callbackFromCars={this.carsArrayFromOptbar} allCars={this.state.allCars} brands={this.state.brands} countries={this.state.countries}/>
                        : ''}

                        {this.state.loading ? '' :
                            <div>
                                {this.state.cars.length ?
                                    <CarList cars={this.state.cars} />
                                    : <h1 className="notfound">Sorry, nothing found(</h1>
                                }</div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}