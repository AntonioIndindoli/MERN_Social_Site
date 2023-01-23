import React from "react";
import Sidenav from "./Sidenav";
import Post from "./Post";
import Feed from "./Feed";

export default function Home() {
    return (
        <div>
            <Sidenav/>
            <Post/>
            <Feed/>
        </div>
    );
}
