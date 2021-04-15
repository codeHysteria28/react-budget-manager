import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import './Header.css';
import * as Sentry from "@sentry/react";
import logo from '../images/app-ico.png';
class Header extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    userProfile = () => {
        window.location = '/profile';
    }

    dashboard = () => {
        window.location = '/dashboard';
    }

    signIn = () => {
        window.location = '/login';
    }

    getStarted = () => {
        window.location = '/signup';
    }

    render() {
        if(this.props.loc === "dashboard") {
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
        }else {
            return (
                <Router>
                        <MDBNavbar color="default-color" dark expand="md">
                            <MDBNavbarBrand>
                                <img src={logo} alt="page logo" className="logo_header mr-3"/>
                                <strong className="white-text landing_header_head">Budgeter</strong>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={this.toggleCollapse} />
                            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <MDBNavLink to="/login" onClick={this.signIn}>
                                            <MDBIcon icon="user-alt" style={{marginRight: 15}}/> Sign in
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/signup" onClick={this.getStarted}>
                                            <MDBIcon icon="rocket" style={{marginRight: 15}}/> Get Started
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/signup">
                                            <MDBIcon icon="comments" style={{marginRight: 15}}/> Get in touch
                                        </MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBNavbar>
                    </Router>
            );
        }
    }
}

export default Sentry.withProfiler(Header);