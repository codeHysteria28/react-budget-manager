import React, {useState} from 'react';
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import axios from "axios";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import * as Sentry from "@sentry/react";
import inv_icon from '../images/investment.png'
import './Login.css';

const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = (e) => {
        e.preventDefault();

        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "https://budgeterapp.azurewebsites.net/login",
        }).then((res) => {
            if(res.data === "No user exists" || res.data === "Wrong password"){
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong with logging in, please try again.',
                    text: `${res.data}`
                });
            }else {
                const cookie = new Cookies();
                cookie.set('token',res.data, { path: '/' });
                window.location = '/dashboard';
            }
        });
    }



    return (
        <>
            <div className="bg"></div>
            <MDBContainer className="signup_cont">
                <MDBRow className="signup_row">
                    <MDBCol md="6 mx-auto login_form">
                        <img src={inv_icon} className="inv_ico" alt="finance growing"/>
                        <form id="sign_form">
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Your Username
                            </label>
                            <input type="text" id="defaultFormLoginEmailEx" className="form-control username" name="username" onChange={e => setLoginUsername(e.target.value)}/>
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Your password
                            </label>
                            <input type="password" id="defaultFormLoginPasswordEx" className="form-control password mb-2" name="password" onChange={e => setLoginPassword(e.target.value)}/>
                            <a href="/signup" className="not_a_user_yet">Not a user yet ?</a>
                            <div className="text-center mt-4">
                                <MDBBtn color="success" className="login_btn" type="submit" onClick={e => login(e)}>Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default Sentry.withProfiler(Login);