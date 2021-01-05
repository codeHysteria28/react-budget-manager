import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
    const [test, setTest] = useState('');
    const [user, setUser] = useState('');
    let test_obj = {
        "name": "tester",
        'id': 1
    }

    const loadTest = () => {
        axios.get('http://localhost:1999/ping').then(res => {
            console.log(res);
            setTest(res.data);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    const testclick = () => {
        axios.post('http://localhost:1999/save',test_obj).then(function (response) {
            console.log(response);
            setUser(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        loadTest();
    },[]);

    console.log(user);

    return (
        <div>something and {test} <button onClick={testclick}>test</button>
        </div>
    );
}

ReactDOM.render(<App/>, document.querySelector("#root"));