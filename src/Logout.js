import React from 'react';
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Logout() {

    // set the cookie
    cookies.remove("TOKEN", true);
    window.location.href = "/";

    return (
        <>
        </>
    )

}



