import React from "react";
import Cookies from "universal-cookie";
import { Col, Row, Form, Button } from "react-bootstrap";
const cookies = new Cookies();

export default function Sidenav() {
    const token = cookies.get("TOKEN");

    return (
        <div>
            <Col container justify="flex-end">
            <div className="sidenav-right">
                {!token &&
                    <><a className='sidenav-text' href="/login">Login</a><a className='sidenav-text' href="/register">Register</a></>
                }
                {token &&
                    <><a className='sidenav-text' href="/logout">Logout</a></>
                }
            </div >
            </Col>
        </div>
    );
}
