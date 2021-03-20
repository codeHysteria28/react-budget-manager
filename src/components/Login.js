import React, {useState} from 'react';
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import axios from "axios";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import {url, local_url} from './api';

const Login = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = (e) => {
        e.preventDefault();

        let url_serv;
        if(local_url === "http://localhost:3000"){
            url_serv = local_url;
        }else {
            url_serv = url; 
        }

        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: url_serv + "/login",
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
                window.location = url_serv + '/dashboard';
            }
        });
    }



    return (
        <MDBContainer className="signup_cont">
            <MDBRow className="signup_row">
                <MDBCol md="6 mx-auto">
                    <form id="sign_form">
                        <p className="h4 text-center mb-4">Login</p>
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Your Username
                        </label>
                        <input type="text" id="defaultFormLoginEmailEx" className="form-control" name="username" onChange={e => setLoginUsername(e.target.value)}/>
                        <br />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                            Your password
                        </label>
                        <input type="password" id="defaultFormLoginPasswordEx" className="form-control" name="password" onChange={e => setLoginPassword(e.target.value)}/>
                        <br />
                        <div className="text-center mt-4">
                            <MDBBtn color="success" type="submit" onClick={e => login(e)}>Login</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;