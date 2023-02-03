import React from 'react';
import { useState } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import SettingsIcon from '@mui/icons-material/Settings';

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function EditUser({ user }) {
    var name = cookies.get("USER");
    const [bio, setText] = useState("");
    const [showForm, setForm] = useState(false);
    const [showWarning, setWarning] = useState(false);
    const [file, setFile] = useState();

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

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
        data.append("bio", bio);
        if (file) {
            data.append("file", file);

            const configuration = {
                method: "put",
                url: "http://localhost:3000/users/" + name,
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
        else {
            const configuration = {
                method: "put",
                url: "http://localhost:3000/users/" + name,
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
    }
    /* 
                                <input onChange={fileSelected} accept="image/*" type="file"></input>

                                <Button
                                    className='show-more'
                                    variant="primary"
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                >Upload</Button>
    */
    return (
        <>


                    {showForm &&
                        <Form className='form-struct-post' onSubmit={(e) => handleSubmit(e)}>

                            <p className='edit-profile'>Update Bio</p>
                            {/* bio */}
                            <Form.Group controlId="formBasictext">
                                <textarea
                                    className='form-post-input-label-comment'
                                    type="textarea"
                                    name="text"
                                    value={bio}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Enter text"
                                />
                            </Form.Group>

                            <p className='edit-profile'>Update Profile Picture</p>
                            {/* submit button */}
                            <Row className='button-bar'>
                                {file && <p className='text-notify'>File Attached</p>}
                                <Button className='submit-button' onClick={handleClick}>
                                    Upload Image
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
                                >Save Changes</Button>

                            </Row>

                        </Form>
                    }
                    {!showForm &&
                        <Button
                            className='show-more'
                            variant="primary"
                            onClick={(e) => handleSubmitShow(e)}
                        >
                            <SettingsIcon fontSize="large"></SettingsIcon>
                              Edit</Button>
                    }
                    {showWarning && <p className='text-warning'>You must be signed in to edit</p>}


        </>
    )

}

