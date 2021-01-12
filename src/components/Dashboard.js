import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from "./Header";
// import Example from "./TestChart";
import SpendingTableEntries from "./SpendingTableEntries";

class Dashboard extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            auth: false,
            spending: null
        }
    }

    logout = () => {
        axios({
            method: "post",
            url: "http://localhost:1998/logout",
            withCredentials: true,
        }).then((res) => {
            window.location = '/login';
        });
    }

    getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:1998/user",
        }).then((res) => {
            if(res.data !== ""){
                this.setState({data: res.data});
                this.setState({auth: true})
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error with authentication, please try again later.'
                });

                setTimeout(() => {
                    this.logout();
                }, 2000);
            }
        });
    };

    componentDidMount() {
        this.getUser();
    }

    render() {

        console.log(this.state.modal);
        return (
            <div>
                {this.state.auth
                    ?
                    <div>
                        <Header user={this.state.data.username} logout={this.logout}/>
                        <SpendingTableEntries user={this.state.data.username}/>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

export default Dashboard;