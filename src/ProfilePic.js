import axios from "axios";
import React, { Image, Row, Col, useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { BrowserRouter as Router, useParams, } from "react-router-dom";

export default function ProfilePic({user}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/users/"+user)
            .then((res) => setData(res.data.users))
            .catch(console.error);
    }, []);
    
    if (data) {
        if (data.map    ) {
        alert(found);
        const blob = new Blob([Int8Array.from(data.img)], {type: data.img.contentType });
        const image = window.URL.createObjectURL(blob);

        return (
            <React.Fragment>
                <img src={image} />
            </React.Fragment>
        );
        }
        return null;
    }
    return null;
}