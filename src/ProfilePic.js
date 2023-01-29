import axios from "axios";
import React, { Image, Row, Col, useState, useEffect } from 'react';
import placeholder from './placeholder.png';

export default function ProfilePic({ userParam }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/users/" + userParam)
            .then((res) => setData(res.data.user))
            .catch(console.error);

    }, []);

    if (data.length) {
        const images = data.map(({ img }) => img)
        if(images[0] && images[0] != 'noImage'){
        return (
            <React.Fragment>
                <img className="pfp" src={`data:image/png;base64,${images[0]}`} />
            </React.Fragment>
        );
        }
        return (
            //Placeholder
            <React.Fragment>
                <img className="pfp" src={placeholder} />
            </React.Fragment>
        );
    }
    return null;
}
