import React, {useState, useEffect} from "react";
import axios from "axios";

const Dashboard = () => {
    const [data, setData] = useState(null);

    const logout = () => {
        axios({
            method: "post",
            url: "http://localhost:1998/logout",
            withCredentials: true,
        }).then((res) => {
            window.location = '/';
        });
    }

    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:1998/user",
        }).then((res) => {
            setData(res.data);
        });
    };

    // useEffect(() => {
    //     getUser();
    // },[data]);

    return (
        <div>
            {data ? <h1>Welcome Back {data.username}</h1> : null}
            <button onClick={getUser}>Submit</button>
            <button type="button" onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;