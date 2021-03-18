import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import { render } from 'react-dom';
import Signup from "./components/signUp/Signup";
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import UserProfile from './components/UserProfile';

render((
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Signup} />
                <Route exact={true} path="/dashboard" component={Dashboard} />
                <Route exact={true} path="/profile" component={UserProfile}/>
                <Route exact={true} path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
),document.getElementById('root'));