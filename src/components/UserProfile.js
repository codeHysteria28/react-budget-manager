import React from 'react';
import Header from './Header';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2';
import {MDBContainer, MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import userPlaceholder from '../images/user.png';
import kofi from '../images/kofi.png';
import * as Sentry from "@sentry/react";
import './UserProfile.css';

class UserProfile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            auth: false,
            username: null,
            user_id: null,
            userProfile: null,
            modal: false,
            file: null,
            avatar: ''
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

    arrayBufferToBase64 = buffer => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    }

    getUserAvatar = username => {
        axios({
            method: "post",
            url: "https://budget-manager-app28.herokuapp.com/get_avatar",
            withCredentials: true,
            data: {user: username}
        }).then((res) => {
            let base64Flag = `data:${res.data.contentType};base64,`;
            let imageStr = this.arrayBufferToBase64(res.data.avatar.data);
            this.setState({avatar: base64Flag + imageStr})
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
            this.getUserAvatar(dekode_jwt.username);
        }
    }

    deleteUser = () => {
        Swal.fire({
            icon: 'info',
            title: 'Are you sure to delete your account ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Delete Permanently`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "post",
                    url: "https://budget-manager-app28.herokuapp.com/deleteUser",
                    data: {username: this.state.username},
                    withCredentials: true,
                }).then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: `${res.data}`,
                        text: 'You will be logged out ...'
                    });

                    setTimeout(() => {
                        this.logout();
                    }, 1500)
                });
            }
        })
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    saveImg = (e) => {
        const selectedFile = e.target.files[0];
        this.setState({
            file: selectedFile,
            loaded: 0
        });
    }

    uploadAvatar = () => {
        const data = new FormData();
        data.append('avatar', this.state.file);
        data.append('username', this.state.username);

        axios({
            method: "post",
            url: "https://budget-manager-app28.herokuapp.com/add_avatar",
            data: data
        }).then((res) => {
            this.getUserAvatar(this.state.username);
        });
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
                    <Header user={this.state.username} logout={this.logout} loc="dashboard"/>
                    <br/>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol sm="6" md="4">
                                <MDBCard>
                                    <button onClick={this.toggle} className="avatar_handler">
                                        <MDBCardImage style={{marginTop: 10}} className="img-fluid" src={this.state.avatar === '' ? userPlaceholder : this.state.avatar}/>
                                    </button>
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-center">{this.state.username}</MDBCardTitle>
                                        <MDBCardText className="text-center">Some quick example of your BIO</MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6" md="8">
                                <MDBCard style={{marginBottom: 30}}>
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
                                <MDBBtn color="danger" onClick={this.deleteUser}>Delete Account</MDBBtn>
                                <a href="https://www.buymeacoffee.com/branislavbuna" target="blank">
                                    <MDBBtn className="support_btn">
                                        <img src={kofi} alt="buy me a coffee logo" className="kofi"/>
                                        Support Creator
                                    </MDBBtn>
                                </a>
                            </MDBCol>
                        </MDBRow>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle}>Avatar Upload</MDBModalHeader>
                            <MDBModalBody>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    onChange={this.saveImg}
                                    name="avatar"
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    Choose file
                                    </label>
                                </div>
                            </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                                <MDBBtn color="primary" onClick={this.uploadAvatar}>Upload</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>
                </div>
                : ""
                }
            </div>
        );
    }
}

export default Sentry.withProfiler(UserProfile);