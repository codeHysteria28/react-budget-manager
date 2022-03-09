import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "./Signup.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import * as Sentry from "@sentry/react";
import rocket from '../../images/rocket.png'

class Signup extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameErr: "",
            passErr: "",
            conf_password: ""
        }
    }

    errors = (username,password,conf_pass) => {
        if(username === "") { this.setState({usernameErr: "Username cannot be empty"}) }
        if(username.length <= 5) { this.setState({usernameErr: "Username must be longer then 5 characters"}) }
        if(password === "") { this.setState({passErr: "Password cannot be empty"}) }
        if(password.length <= 5) { this.setState({passErr: "Password must be longer then 5 characters"}) }
        if(conf_pass === "") {  this.setState({conf_password: "Password confirmation cannot be empty"}) }
        if(conf_pass !== password) { this.setState({conf_password: "Passwords must match"}) }
    }

    signup = async (e) => {
        e.preventDefault();
        this.setState({usernameErr: ""});
        this.setState({passErr: ""});
        this.setState({conf_password: ""});

        try{
            const user_data = new FormData(e.target);
            const user_obj = {};
            user_data.forEach((val,key) => {
                user_obj[key] = val;
            });

            await this.errors(user_obj.username, user_obj.password, user_obj.conf_password);

            if(this.state.usernameErr !== "" || this.state.passErr !== "" || this.state.conf_password !== "") {
                return false;
            }else {

                axios.post('https://budgeterapp.azurewebsites.net/register', user_obj).then((res) => {
                    if(res.data === "success") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration was successful!',
                            text: 'Now, you will be redirected to login page.',
                            confirmButtonText: `Continue`,
                        }).then((result) => {
                            window.location = '/login';
                        });
                    }else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong with registration, please try again.',
                            text: `${res.data}`
                        });
                    }
                });
            }
        }catch(err) {
            console.log(err);
            Swal.fire({
                'icon': 'error',
                'title': 'Something went wrong, please try again.'
            });
        }
    }

    login_screen = () => {
        window.location = '/login';
    }

    render() {
        return (
            <>
                <div className="bg"></div>
                <MDBContainer className="signup_cont">
                    <MDBCol md="6 mx-auto reg_form">
                        <img src={rocket} className="rocket_ico" alt="get rocket started"/>
                        <form id="sign_form" onSubmit={this.signup.bind(this)}>
                            <input type="hidden" value={moment().format('MMM Do YY')} name="created_at"/>
                            <MDBRow>
                                <MDBCol sm="6">
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Your Username
                                    </label>
                                    {this.state.usernameErr ? <p className="text-danger">{this.state.usernameErr}</p>: ''}
                                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="username"/>
                                    <br />
                                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                        Your password
                                    </label>
                                    {this.state.passErr ? <p className="text-danger"> {this.state.passErr}</p>: ''}
                                    <input type="password" id="defaultFormLoginPasswordEx" className="form-control" name="password"/>
                                    <br />
                                    <label htmlFor="defaultFormLoginPasswordExRep" className="grey-text">
                                        Confirm Your password
                                    </label>
                                    {this.state.conf_password ? <p className="text-danger">{this.state.conf_password}</p>: ''}
                                    <input type="password" id="defaultFormLoginPasswordExRep" className="form-control" name="conf_password"/>
                                    <br/>
                                </MDBCol>
                                <MDBCol sm="6" md="6">
                                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                        Full Name
                                    </label>
                                    <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="fullName" required/>
                                    <br />
                                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                        Email
                                    </label>
                                    <input type="email" id="defaultFormLoginPasswordEx" className="form-control" name="email" required/>
                                    <br/>
                                    <label htmlFor="budget" className="grey-text">
                                        Monthly Budget
                                    </label>
                                    <input type="number" id="budget" className="form-control" name="budget"/>
                                    <br/>
                                </MDBCol>
                            </MDBRow>
                            <a href="/login" className="not_a_user_yet">Already a member ?</a>
                            <div className="text-center mt-4">
                                <MDBBtn color="success" className="login_btn" type="submit">Register</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBContainer>
            </>
        );
    }
};

export default Sentry.withProfiler(Signup);