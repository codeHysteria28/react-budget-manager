import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Signup from "./components/signUp/Signup";

const App = () => {

    const loadTest = () => {
        axios.get('http://localhost:1998/ping').then(res => {
            console.log(res);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    useEffect(() => {
        loadTest();
    },[]);

    return (
        // <div>something and {test} <button onClick={testclick}>test</button>
        //
        // </div>
        <div>
            <Signup/>
        </div>
    );
}

ReactDOM.render(<App/>, document.querySelector("#root"));