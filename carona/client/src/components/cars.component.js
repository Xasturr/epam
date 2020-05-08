import React, { Component } from 'react';
import axios from 'axios';
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
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeYearFrom = this.onChangeYearFrom.bind(this);
        this.onChangeYearTo = this.onChangeYearTo.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onChangeSorting = this.onChangeSorting.bind(this);
        this.onSpecClick = this.onSpecClick.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearchBtnClick = this.onSearchBtnClick.bind(this);

        this.state = {
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
            specs: 'open',
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

                this.setState({ cars: res.data });

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

    onSearch(e) {
        e.preventDefault();

        const params = {
            brand: this.state.brand,
            model: this.state.model,
            class: this.state.class,
            country: this.state.country,
            yearFrom: this.state.yearFrom,
            yearTo: this.state.yearTo
        };

        axios.post(url + '/cars/search', params)
            .then(res => {
                res.data = this.sortCars(res.data, this.state.sorting);

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

    onChangeBrand(e) {
        e.preventDefault();
        const b = e.target.value;
        this.setState({ brand: b });

        let models = [];
        if (b.length > 0) {
            axios.get(url + '/cars')
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].brand.toLowerCase() === b.toLowerCase())
                            models.push(res.data[i].model);
                    }
                    this.setState({ models: models });
                })
                .catch(err => console.log(err));
        }
    }

    onChangeModel(e) {
        this.setState({ model: e.target.value });
    }

    onChangeClass(e) {
        this.setState({ class: e.target.value });
    }

    onChangeCountry(e) {
        this.setState({ country: e.target.value });
    }

    onChangeYearFrom(e) {
        this.setState({ yearFrom: e.target.value });
    }

    onChangeYearTo(e) {
        this.setState({ yearTo: e.target.value });
    }

    onClear(e) {
        this.setState({
            brand: '', model: '', class: '', country: '', yearTo: '', yearFrom: ''
        });
    }

    onChangeSorting(e) {
        this.setState({ sorting: e.target.value });
        let cars = this.state.cars;
        cars = this.sortCars(cars, e.target.value);
        this.setState({ cars: cars })
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
            document.getElementsByClassName("sidenav")[0].style.height = "220px";
        }
        else {
            this.setState({ specs: 'open' });
            document.getElementsByClassName("sidenav")[0].style.height = "0px";
        }
    }

    onSearchInputChange(e) {
        this.setState({ searchInput: e.target.value });
    }

    onSearchBtnClick(e) {
        let searchInput = this.state.searchInput;
        axios.get(url + '/cars')
            .then(res => {
                this.setState({ loading: true });
                if (searchInput) {
                    let cars = [];
                    let brandModel = '';

                    for (let i = 0; i < res.data.length; i++) {
                        brandModel = res.data[i].brand + ' ' + res.data[i].model + ' ' + res.data[i].year;
                        if (brandModel.toLocaleLowerCase().includes(searchInput.toLowerCase()))
                            cars.push(res.data[i]);
                    }
                    return this.setState({ cars: this.sortCars(cars, this.state.sorting) });
                }
                else {
                    return this.setState({ cars: this.sortCars(res.data, this.state.sorting) });
                }
            })
            .then(res => {
                this.setState({ loading: false });
            })
            .catch(err => console.log(err));
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
                        <ul className="sidenav">
                            <li className="sidenav__li">
                                <p className="sidenav__element">Brand</p>
                                <input className="sidenav__input" value={this.state.brand} list="brands" name="brand" placeholder="Choose" onChange={this.onChangeBrand}>
                                </input>
                                <datalist id="brands">
                                    {this.Brands()}
                                </datalist>
                            </li>
                            <li className="sidenav__li">
                                <p className="sidenav__element">Models</p>
                                <input className="sidenav__input" value={this.state.model} list="models" name="model" placeholder="Choose" onChange={this.onChangeModel}>
                                </input>
                                <datalist id="models">
                                    {this.Models()}
                                </datalist>
                            </li>
                            <li className="sidenav__li">
                                <p className="sidenav__element">Class</p>
                                <input className="sidenav__input" value={this.state.class} list="classes" name="class" placeholder="Choose" onChange={this.onChangeClass}>
                                </input>
                                <datalist id="classes">
                                    <option value="Economy" />
                                    <option value="Business" />
                                    <option value="Premium" />
                                </datalist>
                            </li>
                            <li className="sidenav__li">
                                <p className="sidenav__element">Countries</p>
                                <input className="sidenav__input" value={this.state.country} list="countries" name="country" placeholder="Choose" onChange={this.onChangeCountry}>
                                </input>
                                <datalist id="countries">
                                    {this.Countries()}
                                </datalist>
                            </li>
                            <li className="sidenav__li">
                                <p className="sidenav__element">Year</p>
                                <div className="sidenav__element__year">
                                    <input type="number" className="sidenav__input__year" value={this.state.yearFrom} name="year_from" placeholder="From" onChange={this.onChangeYearFrom}>
                                    </input>
                                    <input type="number" className="sidenav__input__year" value={this.state.yearTo} name="year_to" placeholder="To" onChange={this.onChangeYearTo}>
                                    </input>
                                </div>
                            </li>
                            <li className="sidenav__li__submit">
                                {/* <div className="sidenav__element__btn"> */}
                                <input type="submit" value="Search" className="sidenav__button" onClick={this.onSearch} />
                                <input type="submit" value="Clear" className="sidenav__button" onClick={this.onClear} />
                                {/* </div> */}
                            </li>
                        </ul>

                        {this.state.loading ? '' :
                            <div>{this.state.cars.length ?
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