import Sidenav from "./Sidenav";
import React from "react";
import Post from "./Post";
import UserList from "./UserList";

export default function AuthComponent() {
    return (
        <div>
            <Sidenav/>
            <UserList/>
        </div>
    );
}

