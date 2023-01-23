import React from 'react';
import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleSubmit = (e) => {

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3000/signin",
            data: {
                email,
                password
            },
        };

        // prevent the form from refreshing the whole page
        e.preventDefault();
        axios(configuration)
            .then((result) => {
                // set the cookie
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                cookies.set("USER", result.data.message.name, {
                    path: "/",
                });
                alert(result.data.message.name);
                window.location.href = "/auth";
                setLogin(true);
            })
            .catch((error) => {
                error = new Error();
                alert("Error");
            });

        // make a popup alert showing the "submitted" text

    }

    return (
        <>
            <div className="group">
                <Col className="group-box-login">
                    <Row className='form-text'>Login</Row>
                    <Form className='form-struct' onSubmit={(e) => handleSubmit(e)}>

                        {/* email */}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className='form-input'>Email address</Form.Label>
                            <Form.Control
                                className='form-input-label'
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        {/* password */}
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className='form-input'>Password</Form.Label>
                            <Form.Control
                                className='form-input-label'
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
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
                        <p className='App-text'> Need an account?
                            <a className='App-link' href="/register"> Register</a>
                        </p>
                    </Form>
                </Col>
            </div>
        </>
    )

}



