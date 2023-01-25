import axios from "axios";
import React, { Container, Row, Col, useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams, } from "react-router-dom";
import SidenavRight from "./SidenavRight";
import Sidenav from "./Sidenav";
import DOMPurify from "dompurify";
import dateFormat from 'dateformat';

export default function Profile() {
    const { user } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/post/" + user)
            .then((res) => setData(res.data.posts))
            .catch(console.error);
    }, []);
    return (
        <div>
            <React.Fragment>
                {data.map((post) => (
                    <div className="group-feed">
                        <div className="group-box-feed-post">
                        <a href={"/profile/"+post.name} className="Post-text-title">{post.name} - {dateFormat(post.date, "mmmm dS, yyyy")}</a >
                            <article className="Post-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />
                            <img className="Post-img" src={post.imageName} />
                        </div>
                    </div>
                ))}
            </React.Fragment>
        </div>

    );
}