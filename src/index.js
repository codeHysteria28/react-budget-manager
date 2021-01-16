import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Signup from "./components/signUp/Signup";
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import axios from 'axios';

const App = () => {
    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/ping",
        }).then((res) => {
            if(res.data !== ""){
                console.log(res.data);
            }
        });
    };

    useEffect(() => getUser() ,[]);


    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Signup} />
                <Route exact={true} path="/dashboard" component={Dashboard} />
                <Route exact={true} path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.querySelector("#root"));