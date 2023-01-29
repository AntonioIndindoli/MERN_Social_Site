import React from 'react';
import { useState } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import post from './post.png';

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Post() {
    var name = cookies.get("USER");
    const [body, setText] = useState("");
    const [showForm, setForm] = useState(false);
    const [showWarning, setWarning] = useState(false);
    const [file, setFile] = useState();

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    const handleSubmitShow = (e) => {
        if (!name) {
            setWarning(true);
            setForm(false);
        }
        else if (!showForm) {
            setForm(true);
        }
    }

    const handleSubmit = (e) => {
        // set configurations
        const data = new FormData();
        data.append("name", name);
        data.append("body", body);
        if (file) {
            data.append("file", file);
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/post",
            data: data,
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

    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

//<input className='file-upload' onChange={fileSelected} accept="image/*" type="file"></input>
    return (
        <>
            <div className="group-feed">
                <div className="group-box-post">
                    {showForm &&
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
                                {file && <p className='text-notify'>File Attached</p>}
                                <Button className='submit-button' onClick={handleClick}>
                                    Upload a file
                                </Button>
                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={fileSelected}
                                    style={{ display: 'none' }} />

                                <Button
                                    className='submit-button'
                                    variant="primary"
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                >Post</Button>

                            </Row>
                        </Form>
                    }
                    {!showForm &&
                        <div>
                            <Button
                                className='post-button'
                                variant="primary"
                                onClick={(e) => handleSubmitShow(e)}
                            ><img className="post-logo" src={post} alt="post" />Make a Post</Button>

                        </div>
                    }
                    {showWarning && <p className='text-warning'>You must be signed in to post</p>}
                </div>
            </div>
        </>
    )

}