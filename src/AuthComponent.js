import Sidenav from "./Sidenav";
import React from "react";
import Post from "./Post";

export default function AuthComponent() {
    return (
        <div>
            <Sidenav/>
            <h1 className="text-center">Auth Component</h1>
            <Post/>
        </div>
    );
}

