import Sidenav from "./Sidenav";
import React from "react";
import UserList from "./UserList";
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
                        <UserList />
                    </Col>
                    <Col sm={2}>
                        <SidenavRight />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

