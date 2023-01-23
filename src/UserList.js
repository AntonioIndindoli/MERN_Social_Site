import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function UserList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then((res) => setData(res.data.users))
            .catch(console.error);
    }, []);
    alert(data.length);
    if (data.length > 0) {
        return (
            <React.Fragment>
                {data.map((users) => (
                    <div className="group-feed">
                        <h1 className="Post-text">Username: {users.name}</h1>
                        <p className="Post-text">Email: {users.email}</p>
                        <p className="Post-text">Joined on: {users.createdAt}</p>
                    </div>
                ))}
            </React.Fragment>
        );
    }else{alert("yes")}
    return null;
}