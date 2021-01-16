import React, {useState} from 'react';
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import axios from "axios";
import Swal from 'sweetalert2';

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
            url: "/login",
        }).then((res) => {
            if(res.data === "No user exists"){
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong with registration, please try again.',
                    text: `${res.data}`
                });
            }else {
                window.location = '/dashboard';
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