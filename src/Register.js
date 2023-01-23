import React from 'react';
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Register() {

    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_Confirmation] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:3000/signup",
            data: {
                name,
                email,
                password,
                password_confirmation
            },
        };

        // prevent the form from refreshing the whole page
        e.preventDefault();
        axios(configuration)
            .then((result) => {
                setRegister(true);
            })
            .catch((error) => {
                error = new Error();
                alert("Error");
            });

        // make a popup alert showing the "submitted" text
        
    }

    return (
        <>
            <div className = "group">
            <Col className="group-box">
                <Row className='form-text'>Register Account</Row>
            <Form className='form-struct' onSubmit={(e) => handleSubmit(e)}>
                {/* name */}
                <Form.Group controlId="formBasicName">
                    <Form.Label className='form-input'>Username</Form.Label>
                    <Form.Control
                        className='form-input-label'
                        type="name"
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Enter Username"
                    />
                </Form.Group>

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

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className='form-input'>Confirm Password</Form.Label>
                    <Form.Control
                        className='form-input-label'
                        type="password"
                        name="password"
                        value={password_confirmation}
                        onChange={(e) => setPassword_Confirmation(e.target.value)}
                        placeholder=""
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
                <p className='App-text'> Have an account?  
                <a className='App-link' href="/login"> Login</a>
                </p>
                </Row>
                
                {/* display success message */}
                {register ? (
                    <p className="text-success">You Registered Successfully</p>
                ) : (
                    <p className="text-danger"></p>
                )}
            </Form>
            </Col>
            </div>
        </>
    )

}



