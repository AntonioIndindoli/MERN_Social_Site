import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Sidenav() {
    const token = cookies.get("TOKEN");

    return (
        <div>
            <div className="sidenav">
                <a className='sidenav-text' href="/">Home</a>
                {!token &&
                    <><a className='sidenav-text' href="/login">Login</a><a className='sidenav-text' href="/register">Register</a></>
                }
                {token &&
                    <><a className='sidenav-text' href="/logout">Logout</a></>
                }
                <a className='sidenav-text' href="/free">Free Component</a>
                <a className='sidenav-text' href="/auth">Auth Component</a>
            </div >
        </div>
    );
}