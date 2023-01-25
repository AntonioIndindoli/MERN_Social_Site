import React from "react";
import Sidenav from "./Sidenav";
import SidenavRight from "./SidenavRight";
import Post from "./Post";
import Feed from "./Feed";
import { Col, Row, Container, Button } from "react-bootstrap";

export default function Home() {
    return (
        <div>
            <Container>
                <Row>
                    <Col sm={2}>
                    <Sidenav />
                    </Col>


                    <Col sm={8}>
                    <Post />
                    <Feed />
                    </Col>


                    <Col sm={2}>
                    <SidenavRight />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
