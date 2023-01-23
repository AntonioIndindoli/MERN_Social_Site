import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function Feed() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/post")
            .then((res) => setData(res.data.posts))
            .catch(console.error);
    }, []);
    alert(data.length);
    if (data.length > 0) {
        return (
            <React.Fragment>
                {data.map((post) => (
                    <div className="group-feed">
                        <h1 className="Post-text">{post.name}:</h1>
                        <p className="Post-text">{post.body}</p>
                        <p className="Post-text">{post.date}</p>
                    </div>
                ))}
            </React.Fragment>
        );
    }else{alert("yes")}
    return null;
}