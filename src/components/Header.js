import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import './Header.css';
import {url, local_url} from './api';
class Header extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    userProfile = () => {

        let url_serv;
        if(local_url === "http://localhost:3000"){
            url_serv = local_url;
        }else {
            url_serv = url; 
        }

        window.location = url_serv + '/profile';
    }

    dashboard = () => {

        let url_serv;
        if(local_url === "http://localhost:3000"){
            url_serv = local_url;
        }else {
            url_serv = url; 
        }

        window.location = url_serv + '/dashboard';
    }

    render() {
        return (
            <Router>
                <MDBNavbar color="default-color" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text">Budgeter</strong><br/>
                        <small><MDBIcon icon="user" style={{marginRight: 15}}/>{this.props.user}</small>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink to="/dashboard" onClick={this.dashboard}>
                                    <MDBIcon icon="chart-line" style={{marginRight: 15}}/> Dashboard
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/profile" onClick={this.userProfile}>
                                    <MDBIcon icon="user" style={{marginRight: 15}}/>Profile
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#!" onClick={this.props.logout}>
                                        <MDBIcon icon="sign-out-alt" style={{marginRight: 15}}/>Logout
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </Router>
        );
    }
}

export default Header;