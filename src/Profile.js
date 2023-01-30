import axios from "axios";
import React, { Container, Row, Col, useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams, } from "react-router-dom";
import PostComment from "./PostComment";
import Comments from "./Comments";
import DOMPurify from "dompurify";
import dateFormat from 'dateformat';
import ProfilePic from "./ProfilePic";
import EditUser from './EditUser';
import Post from './Post';
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function Profile() {
    const token = cookies.get("TOKEN");
    const currentUser = cookies.get("USER");
    const { user } = useParams();
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/posts/" + user)
            .then((res) => setData(res.data.posts))
            .catch(console.error);

            axios.get("http://localhost:3000/users/" + user)
            .then((res) => setUserData(res.data.user))
            .catch(console.error);
    }, []);

    if (data.length) {
        var createdAt = userData.map(({ createdAt }) => createdAt)
        var bio = userData.map(({ bio }) => bio)
        console.log(createdAt.length)
        if(createdAt.length < 1){
            createdAt = ""
        }
        if(bio.length < 1){
            bio = ""
        }
        return (
            <React.Fragment>
                <div className="group-feed">
                    <div className="group-box-feed-post">
                        <ProfilePic userParam={user} />
                        <a className="Post-text-title">{user}</a >
                        <p  className="Post-text">Joined on: {dateFormat(createdAt, "mmmm dS, yyyy")}</p >
                        <p  className="Post-text">{bio}</p >
                        {currentUser == user && <EditUser />}
                    </div>
                </div>

                {currentUser == user && <Post />}

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
    }else if(userData){
        const createdAt = userData.map(({ createdAt }) => createdAt)
        var bio = userData.map(({ bio }) => bio)
        if(createdAt.length > 0){
            return (
            <React.Fragment>
                <div className="group-feed">
                    <div className="group-box-feed-post">
                        <ProfilePic userParam={user} />
                        <a className="Post-text-title">{user}</a >
                        <p  className="Post-text">Joined on: {dateFormat(createdAt, "mmmm dS, yyyy")}</p >
                        <p  className="Post-text">{bio}</p >
                        {currentUser == user && <EditUser />}
                    </div>
                </div>

                {currentUser == user && <Post />}
            </React.Fragment>
        );
        }
    }
    return null;
}