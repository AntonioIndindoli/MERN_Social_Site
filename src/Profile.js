import axios from "axios";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as useParams, } from "react-router-dom";
import { Button } from "react-bootstrap";
import PostComment from "./PostComment";
import DOMPurify from "dompurify";
import dateFormat from 'dateformat';
import ProfilePic from "./ProfilePic";
import EditUser from './EditUser';
import Post from './Post';
import SettingsIcon from '@mui/icons-material/Settings';
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function Profile() {
    const currentUser = cookies.get("USER");
    
    const { user } = useParams();
    alert("sex");
    const [data, setData] = useState([]);
    const [showWarning, setWarning] = useState(false);
    const [showForm, setForm] = useState(false);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/posts/" + user)
            .then((res) => setData(res.data.posts))
            .catch(console.error);

            axios.get("http://localhost:3000/users/" + user)
            .then((res) => setUserData(res.data.user))
            .catch(console.error);
    }, []);

    const handleSubmitShow = (e) => {
        if (!currentUser) {
            setWarning(true);
            setForm(false);
        }
        else if (!showForm) {
            setForm(true);
        }
    }

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
                    <div className="group-box-post">
                        <ProfilePic userParam={user} />
                        <a className="Post-text-title">{user}</a >
                        <p  className="edit-profile">Joined on: {dateFormat(createdAt, "mmmm dS, yyyy")}</p >
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
                    <div className="group-box-post">
                        <ProfilePic userParam={user} />
                        <a className="Post-text-title">{user}   

                    {showWarning && <p className='text-warning'>You must be signed in to edit</p>}

                    </a >
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

/* 
                        <Button
                            className='show-more'
                            variant="primary"
                            onClick={(e) => handleSubmitShow(e)}
                        >
                            <SettingsIcon fontSize="large"></SettingsIcon>
                              Edit</Button>
*/