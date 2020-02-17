import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import qs from 'qs';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import '../style.css';
import './login.css';

import Loader from 'react-loader-spinner'

class LoginComponent extends Component {
    constructor(props) {
        window.localStorage.clear();
        super(props)
        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false
        };
    }
    onChange = (e) => {
        if (e.target.name === 'password') {
            this.form.isFormValid(false);
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    registerUser = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        this.props.history.push("/register-User");

    }
    loginUser = (e) => {
        e.preventDefault();

        this.setState({ loading: true }, () => {
            axios.put('api/Login/ValidateUser/', qs.stringify({ email: this.state.email, password: this.state.password })).then(result => {
                if (result.data) {
                    window.localStorage.setItem("loginId", result.data.id);
                    ToastsStore.success("Welcome to Shopping Application !");
                    this.setState({ loading: false });
                    this.props.history.push("/home");
                }
                else {
                    ToastsStore.error("Sorry!!! invalid Email or Password!");
                    this.setState({ loading: false });
                    this.props.history.push("/login");
                }
            });
        });
    }

    render() {
        const { submitted, loading } = this.state;
        return (
            <React.Fragment>
                {loading ? <Loader type="TailSpin" className="loader-style " height="100" width="100" /> :

                    <div>
                        <div>
                            <ToastsContainer store={ToastsStore} />
                        </div>

                        <div className="bg-style">
                            <h2 className="font-color">Login</h2>
                            <ValidatorForm ref={r => (this.form = r)} onSubmit={this.loginUser} >
                                <TextValidator label="Email" name="email" value={this.state.email} fullWidth
                                    onChange={this.onChange} validators={['required', 'isEmail']}
                                    errorMessages={['Email is required', 'Email is not valid']} />

                                <TextValidator label="Password" onChange={this.onChange} name="password" fullWidth
                                    type="password" value={this.state.password}
                                    validators={['required']} errorMessages={['Password is required']} />
                                <br />
                                <Button className="theme-color m-10" variant="contained" type="submit" disabled={submitted}>
                                    Login
                        </Button>
                                <Button className="font-color" onClick={this.registerUser}>Register</Button>
                            </ValidatorForm>
                        </div>
                    </div>
                }
            </React.Fragment>

        )
    }
}

export default LoginComponent;
