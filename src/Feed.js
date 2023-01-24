import axios from "axios";
import React, { Col, useState, useEffect } from 'react';

export default function Feed() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/post")
            .then((res) => setData(res.data.posts))
            .catch(console.error);
    }, []);
    if (data.length > 0) {
        return (
            <React.Fragment>
                {data.map((post) => (
                    <div className="group-feed">
                <div className="group-box-feed-post">
                        <h1 className="Post-text">{post.name} on {post.date}</h1>
                        <p className="Post-text">{post.body}</p>
                    </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
    return null;
}