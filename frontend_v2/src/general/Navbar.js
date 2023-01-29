import React, { Component } from 'react';
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { loadState, saveState } from '../localstorage/LocalStorage';
import { LocalStorageKey } from '../localstorage/LocalStorageKey'

export class AseNavbar extends Component {

    constructor(props) {
        super(props);
        let userType = loadState("userType");
        let login = loadState("login");
        this.state = {
            "userType": userType,
            "login": login
        };
        this.getLoginStatus = this.getLoginStatus.bind(this);
        this.getLoginUrl = this.getLoginUrl.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
    }

    getLoginStatus() {
        let loginStatus = loadState("login");
        console.log(loginStatus);
        if (loginStatus === undefined || loginStatus === false) {
            return "Login"
        } else {
            return "Logout"
        }
    }

    getLoginUrl() {
        return loadState("login") === false ? "/login" : "/logout";
    }

    logoutClicked(event) {
        if (loadState("login") === true) {
            saveState("login", false);
            saveState("token", "");
            saveState("userType", "");
        } else {
            window.location.href = "/home";
        }
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={this.logoutClicked} href={this.getLoginUrl()}>
                                {
                                    this.getLoginStatus()
                                }
                            </Nav.Link>
                            {
                                this.state.userType === "DELIVERER" ?
                                    <Nav.Link href="scanqr">
                                        Scan QR
                                    </Nav.Link>
                                    : <div />
                            }

                            {
                                this.state.userType === "DISPATCHER" ?
                                    (
                                        <React.Fragment>
                                            <NavDropdown title="BoxForDispatcher" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/box/create">
                                                        Add Box
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/box/list/all">
                                                        List Box
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/box/update">
                                                        Update Box
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/box/delete">
                                                        Delete Box
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="DeliveryForDispacther" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/create">
                                                        Add Delivery
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/list/dispatcher/all">
                                                        List Delivery
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/update">
                                                        Update Delivery
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/delete">
                                                        Delete Delivery
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="User" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/user/register">
                                                        Add User
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/list/user">
                                                        List User
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/user/update">
                                                        Update User
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/user/delete">
                                                        Delete User
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </React.Fragment>
                                    ) : <div />
                            }
                            {
                                this.state.userType === "DELIVERER" ?
                                    (
                                        <React.Fragment>
                                            <NavDropdown title="BoxForDeliverer" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/deliverer/box/list">
                                                        List Box For Deliverer
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>

                                            <NavDropdown title="DeliveryForDeliverer" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/list/deliverer">
                                                        List Delivery
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </React.Fragment>
                                    ) : <div />
                            }
                            {
                                this.state.userType === "CUSTOMER" ?
                                    (
                                        <React.Fragment>
                                            <NavDropdown title="DeliveryForCustomer" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/list/customer/active">
                                                        List Delivery For User Active
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/list/customer/past">
                                                        List Delivery For User Past
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="delivery/track">
                                                        Track Delivery For User
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </React.Fragment>
                                    ) : <div />
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default AseNavbar;