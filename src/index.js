import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
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
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

Sentry.init({
    dsn: "https://3d2de584119d4f89989a6a54c298910a@o556223.ingest.sentry.io/5686782",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

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

serviceWorkerRegistration.register();