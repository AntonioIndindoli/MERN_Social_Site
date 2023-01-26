import Sidenav from "./Sidenav";
import React from "react";
import SidenavRight from "./SidenavRight";
import { Col, Row, Container, Button } from "react-bootstrap";
import EditUser from "./EditUser";
import Profile from "./Profile";

export default function MyProfile() {
    return (

        <div>
            <Container>
                <Row>
                    <Col sm={2}>
                        <Sidenav />
                    </Col>
                    <Col className="feed-container" sm={8}>
                        <EditUser />
                        <Profile/>
                    </Col>
                    <Col sm={2}>
                        <SidenavRight />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

