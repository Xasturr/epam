import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config.js';
const url = config.url;

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onLogout = this.onLogout.bind(this);

        this.state = {
            auth: false,
            isLoggedIn: false,
            userId: '',
            userLogin: '',
            isAdmin: false,
            search: ''
        }
    }

    onChangeSearch(e) {
        this.setState({ search: e.target.value });
    }

    componentDidMount() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            this.setState({ isLoggedIn: true });
            const reqOptions = {
                headers: { Authorization: `Bearer ${jwt}`, },
            };
            axios.get(url + '/users/me', reqOptions)
                .then(x => {
                    this.setState({ userLogin: x.data.user.login });
                    this.setState({ userId: x.data.user._id });
                    if (x.data.user.role)
                        this.setState({ isAdmin: true });
                })
                .catch(err => console.log(err.message))
        }
        else {
            this.setState({ isLoggedIn: false });
        }
    }

    onLogout(e) {
        localStorage.removeItem('jwt');
    }

    render() {
        let userPageUrl = '../../users/' + this.state.userId;
        const users = (
            <li className="navbar-item">
                <Link to="/users" className="nav-link">Users</Link>
            </li>
        )
        const blogs = (
            <li className="navbar-item">
                <Link to="/blogs" className="nav-link">Blogs</Link>
            </li>
        )
        const companies = (
            <li className="navbar-item">
                <Link to="/companies" className="nav-link">Companies</Link>
            </li>
        )
        const news = (
            <li className="navbar-item">
                <Link to="/news" className="nav-link">News</Link>
            </li>
        )

        const searchUrl = "/search/" + this.state.search;

        const search = (
            <ul className="navbar-nav mx-auto">
                <li className="navbar-item">
                    <input type="text" className="form-control" onChange={this.onChangeSearch} value={this.state.search} required />
                </li>
                <li className="navbar-item">
                    <form action={searchUrl}>
                        <input id="searchInput" type="submit" value="Search" className="btn btn-dark" onClick={this.onSearch} />
                    </form>
                </li>
            </ul >
        )

        const userSettingsUrl = userPageUrl + '/update';

        const userlinks = (

            <DropdownButton
                alignRight
                title={this.state.userLogin}
                id="dropdown-menu-align-right"
                variant="dark"
            >
                <Dropdown.Item eventKey="1" href={userPageUrl}>My Page</Dropdown.Item>
                <Dropdown.Item eventKey="2" href={userSettingsUrl}>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4" onClick={this.onLogout} href={'/'}>Log out</Dropdown.Item>
            </DropdownButton>
        )
        const guestlinks = (
            <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                    <Link to="/auth/login" className="nav-link">Log in</Link>
                </li>
                <li>
                    <Link to="/auth/signup" className="nav-link">Sign up</Link>
                </li>
            </ul>
        )

        return (
            <nav className="uppernav">
                <ul>
                    <li class="uppernav__li"><a class="uppernav__logo" href="#">Carona</a></li>
                    <li class="uppernav__li"><a class="uppernav__link" href="#">Home</a></li>
                    <li class="uppernav__li"><a class="uppernav__link" href="#">Cars</a></li>
                    <li class="uppernav__li"><a class="uppernav__link" href="#">Contacts</a></li>
                </ul>

                {/* <Link to="/" className="navbar-brand">OutOfLag</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>

                        {this.state.isAdmin ? users : ''}
                        {this.state.isLoggedIn ? blogs : ''}
                        {this.state.isLoggedIn ? companies : ''}
                        {this.state.isLoggedIn ? news : ''}
                        <li className="navbar-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        {this.state.isLoggedIn ? search : ''}
                    </ul>
                    {this.state.isLoggedIn ? userlinks : guestlinks}
                </div> */}
            </nav>
        )
    }
}

export default (Navbar)