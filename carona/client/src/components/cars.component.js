import React, { Component } from 'react';
import axios from 'axios';
import CarList from './car-list.component';
import Optbar from './optbar.component';
import Pagination from './pagination.component';
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
            class: '',
            country: '',
            yearFrom: '',
            yearTo: '',
            sorting: 'Brand from A to Z',
            specs: 'close',
            searchInput: '',
            itemsOnPage: 3,
            currPage: 1,
            pagesAmount: ''
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

                let cars = [];

                for (let i = (this.state.currPage - 1) * this.state.itemsOnPage;
                    i < this.state.currPage * this.state.itemsOnPage; i++) {
                    cars.push(res.data[i]);
                }

                this.setState({
                    allCars: res.data,
                    cars: cars,
                    pagesAmount: Math.ceil(res.data.length / this.state.itemsOnPage)
                }, () => {
                    this.setState({ loading: false });
                });
            })
            .catch(err => {
                console.log("An error occured in componentDidMount in cars.component\n", err);
            })
    }

    onChangeSorting(e) {
        let cars = [];
        let allCars = this.sortCars(this.state.allCars, e.target.value);
        this.setState({
            allCars: allCars,
            currPage: 1,
            sorting: e.target.value,
        }, () => {
            for (let i = (this.state.currPage - 1) * this.state.itemsOnPage;
                i < this.state.currPage * this.state.itemsOnPage && i < this.state.allCars.length; i++) {
                cars.push(allCars[i]);
            }
            this.setState({
                cars: cars,
                loading: true,
            }, () => {
                this.setState({ loading: false });
            })
        });
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
        this.setState({
            searchInput: e.target.value,
            // brand: '',
            // model: '',
            // class: '',
            // country: '',
            // yearTo: '',
            // yearFrom: ''
        });
    }

    onSearchBtnClick(e) {
        let searchInput = this.state.searchInput;
        this.setState({
            loading: true,
            currPage: 1
        }, () => {
            axios.get(url + '/cars')
                .then(res => {
                    let cars = [];
                    res.data = this.sortCars(res.data, this.state.sorting);
                    if (searchInput) {
                        let brandModel = '';
                        let allCars = [];
                        for (let i = 0; i < res.data.length; i++) {
                            brandModel = res.data[i].brand + ' ' + res.data[i].model + ' ' + res.data[i].year;
                            if (brandModel.toLocaleLowerCase().includes(searchInput.toLowerCase())) {
                                allCars.push(res.data[i]);
                                if (cars.length < this.state.itemsOnPage)
                                    cars.push(res.data[i]);
                            }
                        }
                        this.setState({
                            allCars: allCars,
                            cars: cars,
                            pagesAmount: Math.ceil(allCars.length / this.state.itemsOnPage)
                        }, () => {
                            this.setState({ loading: false });
                        })
                    }
                    else {
                        this.setState({
                            loading: true,
                            allCars: res.data
                        }, () => {
                            let cars = [];
                            for (let i = 0;
                                i < this.state.allCars.length && cars.length < this.state.itemsOnPage;
                                i++) {
                                cars.push(this.state.allCars[i]);
                            }
                            this.setState({
                                cars: cars,
                                pagesAmount: Math.ceil(this.state.allCars.length / this.state.itemsOnPage)
                            }, () => {
                                this.setState({ loading: false });
                            });
                        })
                    }
                })
                .catch(err => console.log(err))
        });
    }

    carsArrayFromOptbar = (allCars) => {
        document.getElementsByClassName("optbar")[0].style.height = "220px";
        document.getElementsByClassName("cars__input")[0].value = "";
        allCars = this.sortCars(JSON.parse(allCars, this.state.sorting), this.state.sorting);
        let cars = [];
        for (let i = 0; i < allCars.length && cars.length < this.state.itemsOnPage; i++) {
            cars.push(allCars[i]);
        }
        this.setState({
            cars: cars,
            allCars: allCars,
            loading: true,
            pagesAmount: Math.ceil(allCars.length / this.state.itemsOnPage),
            currPage: 1,
            searchInput: ''
        }, () => {
            this.setState({ loading: false });
        });
    }

    onPageClick = (pageNum) => {
        pageNum = parseInt(pageNum);
        if (pageNum !== this.state.currPage) {
            window.scrollTo(0, 0)
            let cars = [];
            for (let i = (pageNum - 1) * this.state.itemsOnPage;
                i < pageNum * this.state.itemsOnPage && i < this.state.allCars.length; i++) {
                cars.push(this.state.allCars[i]);
            }
            this.setState({
                cars: cars,
                currPage: pageNum,
                loading: true
            }, () => {
                this.setState({ loading: false });
            });
        }
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

                        {(this.state.allCars.length) ?
                            < Optbar callbackFromCars={this.carsArrayFromOptbar} allCars={this.state.allCars} />
                            : ''}

                        {this.state.loading ? '' :
                            <div>
                                {this.state.cars.length ?
                                    <div>
                                        <CarList cars={this.state.cars} />
                                        < Pagination onPageClick={this.onPageClick} currPage={this.state.currPage} pagesAmount={this.state.pagesAmount} />

                                    </div>
                                    : <h1 className="notfound">Sorry, nothing found(</h1>
                                }</div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}