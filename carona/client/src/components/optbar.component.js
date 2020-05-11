import React, { Component } from 'react';
import axios from 'axios';
import config from '../config/config';
const url = config.url;

class Optbar extends Component {
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

        this.state = {
            allCars: this.props.allCars,
            brand: '',
            brands: this.props.brands,
            model: '',
            models: [],
            class: '',
            country: '',
            countries: this.props.countries,
            yearFrom: '',
            yearTo: '',
        }
    }

    componentDidMount() {}

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
                this.props.callbackFromCars(JSON.stringify(res.data));
            })
            .catch(err => {
                console.log("An error occured in onSearch in optbar.component\n", err);
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

    render() {

        return (
            <ul className="optbar">
                <li className="optbar__li">
                    <p className="optbar__element">Brand</p>
                    <input className="optbar__input" value={this.state.brand} list="brands" name="brand" placeholder="Choose" onChange={this.onChangeBrand}>
                    </input>
                    <datalist id="brands">
                        {this.Brands()}
                    </datalist>
                </li>
                <li className="optbar__li">
                    <p className="optbar__element">Models</p>
                    <input className="optbar__input" value={this.state.model} list="models" name="model" placeholder="Choose" onChange={this.onChangeModel}>
                    </input>
                    <datalist id="models">
                        {this.Models()}
                    </datalist>
                </li>
                <li className="optbar__li">
                    <p className="optbar__element">Class</p>
                    <input className="optbar__input" value={this.state.class} list="classes" name="class" placeholder="Choose" onChange={this.onChangeClass}>
                    </input>
                    <datalist id="classes">
                        <option value="Economy" />
                        <option value="Business" />
                        <option value="Premium" />
                    </datalist>
                </li>
                <li className="optbar__li">
                    <p className="optbar__element">Countries</p>
                    <input className="optbar__input" value={this.state.country} list="countries" name="country" placeholder="Choose" onChange={this.onChangeCountry}>
                    </input>
                    <datalist id="countries">
                        {this.Countries()}
                    </datalist>
                </li>
                <li className="optbar__li">
                    <p className="optbar__element">Year</p>
                    <div className="optbar__element__year">
                        <input type="number" className="optbar__input__year" value={this.state.yearFrom} name="year_from" placeholder="From" onChange={this.onChangeYearFrom}>
                        </input>
                        <input type="number" className="optbar__input__year" value={this.state.yearTo} name="year_to" placeholder="To" onChange={this.onChangeYearTo}>
                        </input>
                    </div>
                </li>
                <li className="optbar__li__submit">
                    <input type="submit" value="Search" className="optbar__button" onClick={this.onSearch} />
                    <input type="submit" value="Clear" className="optbar__button" onClick={this.onClear} />
                </li>
            </ul>
        )
    }
}

export default (Optbar)