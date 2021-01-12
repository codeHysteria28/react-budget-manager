import React from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from "./Header";

class Dashboard extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            auth: false
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
        return (
            <div>
                {this.state.auth
                    ?
                    <div>
                        <Header/>
                        <button onClick={this.getUser}>Submit</button>
                        <button type="button" onClick={this.logout}>Logout</button>
                        <p>{this.state.data ? this.state.data.username : null}</p>
                        <p>{this.state.auth}</p>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

export default Dashboard;