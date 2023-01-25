import axios from "axios";
import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';

export default function UserList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then((res) => setData(res.data.users))
            .catch(console.error);
    }, []);
    if (data.length > 0) {
        return (
            <React.Fragment>
                {data.map((users) => (
                    <div className="group-feed">
                    <div className="group-box-feed-post">
                    <p  className="Post-text-info">Username: {users.name}</p >
                    <p  className="Post-text-info">Joined on: {dateFormat(users.createdAt, "mmmm dS, yyyy")}</p >
                    <p  className="Post-text-info">Email: {users.email}</p >
                    </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
    return null;
}