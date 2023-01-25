import axios from "axios";
import React, { Row, Col, useState, useEffect } from 'react';
import DOMPurify from "dompurify";
import dateFormat from 'dateformat';

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
                    <p  className="Post-text-info">{post.name} - {dateFormat(post.date, "mmmm dS, yyyy")}</p >
                    <article className="Post-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body)}} />
                    </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
    return null;
}