import axios from "axios";
import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import ProfilePic from "./ProfilePic";
import ShowMore from 'react-show-more-button/dist/module';

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
                    <ProfilePic userParam={users.name} />
                    <a href={"/profile/"+users.name} className="Post-text-title">{users.name}</a >
                    <p  className="Post-text">Joined on: {dateFormat(users.createdAt, "mmmm dS, yyyy")}</p >
                    </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
    return null;
}