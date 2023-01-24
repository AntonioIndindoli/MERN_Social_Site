import React from 'react';
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Post() {
    var name = cookies.get("USER");
    const [body, setText] = useState("");
    const [showForm, setForm] = useState(true);

    const handleSubmitShow = (e) => {
        if (!showForm && !name)
            setForm(false);
        else if (!showForm && name){
            setForm(true);
        }else{
            setForm(true);
        }    
    }

    const handleSubmit = (e) => {
        alert(name);
        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3000/post",
            data: {
                name,
                body
            },
        };

        // prevent the form from refreshing the whole page
        e.preventDefault();
        axios(configuration)
            .then((result) => {

            })
            .catch((error) => {
                error = new Error();
                alert("Error");
            });

    }
    if (!name) {
       // return (<div className="group-box-post-loggedout">Log In to Post</div>)
    }

    return (
        <>
            <div className="group-post">
                <Col className="group-box-post">
                    {!showForm &&
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
                            <Row className='form-text'>
                                <Button
                                    className='link-header'
                                    variant="primary"
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Submit
                                </Button>

                            </Row>

                        </Form>
                    }
                    {showForm &&
                    <div>
                            <Button
                                className='link-header'
                                variant="primary"
                                onClick={(e) => handleSubmitShow(e)}
                            >
                                Make a Post
                            </Button>
                            <p>You must be signed in to post</p>
                    </div>   
                    }
                </Col>
            </div>
        </>
    )

}



