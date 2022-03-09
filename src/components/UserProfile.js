import React from 'react';
import Header from './Header';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2';
import { MDBContainer, MDBBtn, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import userPlaceholder from '../images/user.png';
import kofi from '../images/kofi.png';
import * as Sentry from "@sentry/react";
import './UserProfile.css';
import toast, { Toaster } from 'react-hot-toast';

const loaded_user_profile = () => toast.success('Successfully loaded user profile.');
const avatar_uploaded = () => toast.success('Avatar uploaded.');
const avatar_upload_err = () => toast.error('Error with uploading avatar.');
const budget_updated = () => toast.success('Monthly budget was changed successfully.');
const budget_update_err = () => toast.error('Error with updating monthly budget.');

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
            avatar: '',
            budgetModal: false,
            budget: null,
            new_budget: null
        }

        this.cookies = new Cookies()
    }

    userProfile = username => {
        axios({
            method: "post",
            url: "http://localhost:1998/getProfile",
            withCredentials: true,
            data: {user: username}
        }).then((res) => {
            this.setState({userProfile: res.data});
            this.setState({budget: res.data.monthlyBudget});
            loaded_user_profile();
        });
    }

    getUserAvatar = username => {
        axios({
            method: "post",
            url: "http://localhost:1998/get_avatar",
            withCredentials: true,
            data: {user: username}
        }).then((res) => {
            this.setState({avatar: res.data.avatar})
        });
    }

    logout = () => {
        axios({
            method: "post",
            url: "http://localhost:1998/logout",
            withCredentials: true,
        }).then((res) => {
            this.cookies.remove('token');
            window.location = '/';
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
            confirmButtonColor: '#FF3547'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "post",
                    url: "http://localhost:1998/deleteUser",
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
        this.setState({modal: !this.state.modal});
    }

    budgetToggle = () => {
        this.setState({budgetModal: !this.state.budgetModal});
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
            url: "http://localhost:1998/add_avatar",
            withCredentials: true,
            data: data,
            origFileName: this.state.file
        }).then(res => {
            this.getUserAvatar(this.state.username);
            this.toggle();
            if(res.data === "success") {
                avatar_uploaded();
            }else {
                avatar_upload_err();
            }
        });
    }

    changeBudget = (e) => {
        const new_budget = Number(e.target.value);
        this.setState({new_budget: new_budget});
    }

    updateBudget = () => {
        if(this.state.new_budget !== null || this.state.new_budget !== undefined) {
            axios({
                method: "post",
                url: "http://localhost:1998/changeBudget",
                withCredentials: true,
                data: {new_budget: this.state.new_budget, username: this.state.username}
            }).then(res => {
                if(res.data === "success") {
                    this.budgetToggle();
                    this.getUser();
                    budget_updated();
                }else {
                    budget_update_err();
                }
            })
        }else {
            budget_update_err();
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
                                        <MDBCardText className="text-center">Focusing on my spending.</MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm="6" md="8">
                                <MDBCard style={{marginBottom: 25}}>
                                    {this.state.userProfile ? 
                                        <MDBCardBody style={{padding: "4rem"}}>
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
                                                Monthly Budget
                                            </MDBCol>
                                            <MDBCol>
                                                <small>{this.state.userProfile.monthlyBudget} €</small>
                                            </MDBCol>
                                        </MDBRow>
                                        <a onClick={this.budgetToggle}><small className="text-success">Change budget</small></a>
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
                                <div className="profile_btns">
                                    {/* <MDBBtn>Edit Profile</MDBBtn> */}
                                    <MDBBtn color="danger" onClick={this.deleteUser}>Delete Account</MDBBtn>
                                    <a href="https://www.buymeacoffee.com/branislavbuna" target="blank">
                                        <MDBBtn className="support_btn">
                                            <img src={kofi} alt="buy me a coffee logo" className="kofi"/>
                                            Support Creator
                                        </MDBBtn>
                                    </a>
                                </div>
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

                        <MDBModal isOpen={this.state.budgetModal} toggle={this.budgetToggle}>
                            <MDBModalHeader>Change Budget</MDBModalHeader>
                            <MDBModalBody>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="budget"
                                    placeholder={'Current budget: ' + this.state.budget + '€'}
                                    onChange={this.changeBudget}
                                />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.budgetToggle}>Close</MDBBtn>
                                <MDBBtn color="primary" onClick={this.updateBudget}>Change Budget</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                        <Toaster />
                    </MDBContainer>
                </div>
                : ""
                }
            </div>
        );
    }
}

export default Sentry.withProfiler(UserProfile);