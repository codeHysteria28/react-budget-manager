import React from 'react';
import Header from './Header';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2';
import {MDBContainer, MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import userPlaceholder from '../images/user.png';
import * as Sentry from "@sentry/react";

class UserProfile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            auth: false,
            username: null,
            user_id: null,
            userProfile: null
        }

        this.cookies = new Cookies()
    }

    userProfile = username => {
        axios({
            method: "post",
            url: "https://budget-manager-app28.herokuapp.com/getProfile",
            withCredentials: true,
            data: {user: username}
        }).then((res) => {
            this.setState({userProfile: res.data});
        });
    }

    logout = () => {

        axios({
            method: "post",
            url: "https://budget-manager-app28.herokuapp.com/logout",
            withCredentials: true,
        }).then((res) => {
            this.cookies.remove('token');
            window.location = '/login';
        });
    }

    getUser = () => {
        const token = this.cookies.get('token');
        if(!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error with authentication, please try again later.'
            });

            setTimeout(() => {
                this.logout();
            }, 2000);
        }else {
            const dekode_jwt = jwt_decode(token);
            this.setState({username: dekode_jwt.username});
            this.setState({user_id: dekode_jwt._id});
            this.setState({auth: true});
            this.userProfile(dekode_jwt.username);
        }
    }


    componentDidMount() {
        this.getUser();
    }

    render(){
        return (
            <div>
                {this.state.auth 
                ? 
                <div>
                    <Header user={this.state.username} logout={this.logout}/>
                    <br/>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol sm="6" md="4">
                                <MDBCard>
                                    <MDBCardImage style={{marginTop: 10}} className="img-fluid" src={userPlaceholder}/>
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-center">{this.state.username}</MDBCardTitle>
                                        <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6" md="8">
                                <MDBCard style={{marginBottom: 45}}>
                                    {this.state.userProfile ? 
                                        <MDBCardBody style={{padding: "3rem"}}>
                                        <MDBRow>
                                            <MDBCol style={{ maxWidth: "15rem" }}>
                                                Full Name
                                            </MDBCol>
                                            <MDBCol>
                                                <small>{this.state.userProfile.fullName}</small>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr  style={{
                                                color: '#2BBBAD',
                                                backgroundColor: '#2BBBAD',
                                                height: .2,
                                                borderColor : '#2BBBAD'
                                        }}/>
                                        <MDBRow>
                                            <MDBCol style={{ maxWidth: "15rem" }}>
                                                Email
                                            </MDBCol>
                                            <MDBCol>
                                                <small>{this.state.userProfile.email}</small>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr  style={{
                                                color: '#2BBBAD',
                                                backgroundColor: '#2BBBAD',
                                                height: .2,
                                                borderColor : '#2BBBAD'
                                        }}/>
                                        <MDBRow>
                                            <MDBCol style={{ maxWidth: "15rem" }}>
                                                Phone
                                            </MDBCol>
                                            <MDBCol>
                                                <small>{this.state.userProfile.phone}</small>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr  style={{
                                                color: '#2BBBAD',
                                                backgroundColor: '#2BBBAD',
                                                height: .2,
                                                borderColor : '#2BBBAD'
                                        }}/>
                                        <MDBRow>
                                            <MDBCol style={{ maxWidth: "15rem" }}>
                                                Address
                                            </MDBCol>
                                            <MDBCol>
                                                <small>{this.state.userProfile.address}</small>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr  style={{
                                                color: '#2BBBAD',
                                                backgroundColor: '#2BBBAD',
                                                height: .2,
                                                borderColor : '#2BBBAD'
                                        }}/>
                                        <MDBRow>
                                            <MDBCol style={{ maxWidth: "15rem" }}>
                                                User from
                                            </MDBCol>
                                            <MDBCol>
                                                <small>{this.state.userProfile.created_at}</small>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr  style={{
                                                color: '#2BBBAD',
                                                backgroundColor: '#2BBBAD',
                                                height: .2,
                                                borderColor : '#2BBBAD'
                                        }}/>
                                    </MDBCardBody> : ""
                                    }
                                </MDBCard>
                                <MDBBtn>Edit Profile</MDBBtn>
                                <MDBBtn color="danger">Delete Account</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
                : ""
                }
            </div>
        );
    }
}

export default Sentry.withProfiler(UserProfile);