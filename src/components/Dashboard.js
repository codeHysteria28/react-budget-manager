import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from "./Header";
import SpendingTableEntries from "./SpendingTableEntries";
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import * as Sentry from "@sentry/react";

class Dashboard extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            auth: false,
            username: null,
            user_id: null
        }

        this.cookies = new Cookies()
    }

    logout = () => {
        axios({
            method: "post",
            url: "https://budgeter-be.azurewebsites.net/logout",
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
        }
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                {this.state.auth
                    ?
                    <div>
                        <Header user={this.state.username} logout={this.logout} loc="dashboard"/>
                        <SpendingTableEntries user={this.state.username}/>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

export default Sentry.withProfiler(Dashboard);