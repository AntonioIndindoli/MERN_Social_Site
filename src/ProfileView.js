import Sidenav from "./Sidenav";
import React from "react";
import Profile from "./Profile";
import SidenavRight from "./SidenavRight";
import { Col, Row, Container, Button } from "react-bootstrap";

export default function AuthComponent() {
    return (

        <div>
            <Container>
                <Row>
                    <Col sm={2}>
                        <Sidenav />
                    </Col>
                    <Col className="feed-container" sm={8}>
                        <Profile />
                    </Col>
                    <Col sm={2}>
                        <SidenavRight />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

