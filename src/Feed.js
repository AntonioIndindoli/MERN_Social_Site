import axios from "axios";
import React, { Image, Col, useState, useEffect } from 'react';
import { Row, Button } from "react-bootstrap";
import DOMPurify from "dompurify";
import dateFormat from 'dateformat';
import Comments from "./Comments";
import PostComment from "./PostComment";
import ProfilePic from "./ProfilePic";
import ShowMore from 'react-show-more-button/dist/module';

export default function Feed() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/post")
            .then((res) => setData(res.data.posts.slice(0,10)))//loads 11 posts
            .catch(console.error);
    }, []);

    if (data.length > 0) {
        return (
            <React.Fragment>
                {data.map((post) => (
                    <div className="group-feed">
                        <div className="group-box-feed-post">
                            <ProfilePic userParam={post.name} />
                            <a href={"/profile/" + post.name} className="Post-text-title">{post.name} - {dateFormat(post.date, "mmmm dS, yyyy")}</a >
                            <article className="Post-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />
                            {post.imageName != "noImage" && <img className="Post-img" src={post.imageName} />}
                            <PostComment postId={post._id} />                    
                        </div>
                    </div>

                ))}
            </React.Fragment>
        );
    }
    return null;
}