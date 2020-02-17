import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import qs from 'qs';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import '../style.css';
import ApiService from '../ApiService';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Loader from 'react-loader-spinner'

class RegisterUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            submitted: false,
            loading: false,
        };
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    onChange = (e) => {
        if (e.target.name === 'password') {
            this.form.isFormValid(false);
        }
        this.setState({ [e.target.name]: e.target.value });
    }
    cancel = (e) => {
        this.props.history.push('/login');
    }

    saveUser = (e) => {
        e.preventDefault();
        this.setState({ loading: true }, () => {
            const userDetail = {
                id: 0,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
            ApiService.addUser(qs.stringify({ userDetail: userDetail })).then(result => {
                this.setState({
                    response: result,
                    loading: false
                })
                ToastsStore.success("User Added Successfully !");
                this.props.history.push('/login');
            });

        });
    }


    render() {
        const { submitted, loading } = this.state;
        return (
            <React.Fragment >
                {loading ? <Loader type="TailSpin" className="loader-style" height="100" width="100" /> :
                    < div >
                        <div>
                            <ToastsContainer store={ToastsStore} />
                        </div>

                        <div>
                            <h2 className="font-color">Add User</h2>
                            <ValidatorForm ref={r => (this.form = r)} onSubmit={this.saveUser} >
                                <TextValidator label="First Name" type="text" value={this.state.firstName}
                                    name="firstName" onChange={this.onChange} fullWidth
                                    validators={['required']}
                                    errorMessages={['First Name is required']} />

                                <TextValidator label="Last Name" type="text" value={this.state.lastName}
                                    name="lastName" onChange={this.onChange} fullWidth
                                    validators={['required']}
                                    errorMessages={['Last Name is required']} />

                                <TextValidator label="Email" name="email" value={this.state.email} fullWidth
                                    onChange={this.onChange} validators={['required', 'isEmail']}
                                    errorMessages={['Email is required', 'Email is not valid']} />

                                <TextValidator label="Password" onChange={this.onChange} fullWidth
                                    name="password" type="password" value={this.state.password}
                                    validators={['required']} errorMessages={['Password is required']} />

                                <TextValidator label="Confirm password" name="confirmPassword" type="password" fullWidth
                                    value={this.state.confirmPassword} onChange={this.onChange}
                                    validators={['required', 'isPasswordMatch']}
                                    errorMessages={['Confirm Password is required', 'Password mismatch']} />

                                <Button className="theme-color m-10" variant="contained" type="submit" disabled={submitted}>
                                    Save
                        </Button>
                                <Button className="font-color mat-raised-button mr-20" onClick={this.cancel}>Cancel</Button>
                            </ValidatorForm>


                        </div>
                    </div >
                }
            </React.Fragment>
        );
    }
}

export default RegisterUserComponent;