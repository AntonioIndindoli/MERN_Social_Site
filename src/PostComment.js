import React from 'react';
import { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, useParams, } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function PostComment({ postId }) {
    var name = cookies.get("USER");
    const profile = "/profile/"+name;
    const [body, setText] = useState("");
    const [showWarning, setWarning] = useState(false);

    const handleSubmit = (e) => {
        if (!name) {
            e.preventDefault();
            setWarning(true);
        } else {

            const configuration = {
                method: "post",
                url: "http://localhost:3000/comment/" + postId,
                data: {
                    name,
                    postId,
                    body,
                },
            };


            // prevent the form from refreshing the whole page
            e.preventDefault();
            axios(configuration)
                .then((result) => {
                    window.location.reload(false);
                })
                .catch((error) => {
                    error = new Error();
                    alert("Error");
                });
        }
    }

    return (
        <>
        {showWarning && <p className='text-warning'>You must be signed in to comment</p>}
            <div className="group-post-comment">
                <div className="group-post-comment-form">
                    {!name && <a  className='Post-text'>Post a comment</a>}
                    {name && <a className='Post-text'href={profile}>Post a comment as {name}</a>}
                    <Form className='form-struct-post' onSubmit={(e) => handleSubmit(e)}>

                        {/* text */}
                        <Form.Group controlId="formBasictext">
                            <textarea
                                className='form-post-input-label'
                                type="textarea"
                                name="text"
                                value={body}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter text"
                            />
                        </Form.Group>

                        {/* submit button */}
                        <Row className='button-bar'>

                            <Button
                                className='submit-button'
                                variant="primary"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                            >Comment</Button>

                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )

}



