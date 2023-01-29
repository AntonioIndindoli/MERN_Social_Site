import React from "react";
import Cookies from "universal-cookie";
import { Row, Col, Button } from "react-bootstrap";
import logo from './logo.png';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
const cookies = new Cookies();

export default function Sidenav() {
    const token = cookies.get("TOKEN");
    let location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <div className="sidenav">
                <Button
                    className='sidenav-text-logo'
                    variant="primary"
                    type="submit"
                    onClick={(e) => navigate('/')}
                >
                    <img className="logo" src={logo} alt="logo" />MayunsHub
                </Button>
                <a className='sidenav-text' href="/auth">User List</a>
            </div >
        </div>
    );
}
