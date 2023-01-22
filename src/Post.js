import React from 'react';
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import './Form.css';

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Post() {
    const author = cookies.get("USER");
    const [body, setText] = useState("");

    const handleSubmit = (e) => {

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3000/post",
            data: {
                author,
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

    return (
        <>
            <div className="group">
                <Col className="group-box-login">
                    <Row className='form-text'>Make a Post</Row>
                    <Form className='form-struct' onSubmit={(e) => handleSubmit(e)}>

                        {/* text */}
                        <Form.Group controlId="formBasictext">
                            <Form.Label className='form-input'></Form.Label>
                            <Form.Control
                                className='form-input-label'
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
                </Col>
            </div>
        </>
    )

}



