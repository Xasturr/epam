import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config/config';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login: '',
            password: '',
            message: '',
            submitBtnDisabled: false,
            forgotBtnDisabled: false
        }
    }

    onChangeLogin(e) {
        this.setState({ message: '' });
        this.setState({ login: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ message: '' });
        this.setState({ password: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({ message: "Please, wait" });
        this.setState({ submitBtnDisabled: true });

        const user = {
            login: this.state.login,
            password: this.state.password
        }

        if (user.login === config.login && user.password === config.password)
            this.props.history.push("/dashboard");
        else {
            this.setState({ message: "Wrong login or password" });
            this.setState({ submitBtnDisabled: false });
            this.setState({ forgotBtnDisabled: false });
            this.setState({
                username: '',
                password: ''
            })
        }
    }

    componentDidMount() {
        document.title = "Login";
    }

    render() {

        const forgotPasswordUrl = '/auth/passwordreset';

        let submitBtn = (
            <div className="form-group">
                <input type="submit"
                    value="Log In"
                    className="btn btn-dark"
                />
            </div>
        )
        if (this.state.submitBtnDisabled) {
            submitBtn = (
                <div className="form-group">
                    <input type="submit"
                        value="Log In"
                        className="btn btn-dark"
                        disabled
                    />
                </div>
            )
        }

        return (
            <div className="container">
                <div className="form-group">
                    <h3><span className="textStyle">Log In</span></h3>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <span className="textStyle">Login: </span>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.login}
                            onChange={this.onChangeLogin}
                        />
                    </div>
                    <div className="form-group">
                        <span className="textStyle">Password: </span>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                        <p>{this.state.message}</p>
                    </div>
                    {submitBtn}
                </form>
            </div>
        )
    }
}