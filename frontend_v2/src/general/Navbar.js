import React, { Component } from 'react';
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { loadState, saveState } from '../localstorage/LocalStorage';
import { LocalStorageKey } from '../localstorage/LocalStorageKey'
import { logout } from './Logout';

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
            logout();
        } else {
            window.location.href = "/home";
        }
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">Ase Delivery</Navbar.Brand>
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
                                    <Nav.Link href="/scanqr">
                                        Scan QR
                                    </Nav.Link>
                                    : <div />
                            }

                            {
                                this.state.userType === "DISPATCHER" ?
                                    (
                                        <React.Fragment>
                                            <NavDropdown title="Box" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/box/create">
                                                        Add
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/box/list/all">
                                                        List
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/box/update">
                                                        Update
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/box/delete">
                                                        Delete
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="Delivery" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/create">
                                                        Add
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/list/dispatcher/all">
                                                        List
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/update">
                                                        Update
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/delivery/delete">
                                                        Delete
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="User" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/user/register">
                                                        Add
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/list/user">
                                                        List
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/user/update">
                                                        Update
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/user/delete">
                                                        Delete
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
                                            <NavDropdown title="Box" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/deliverer/box/list">
                                                        List
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>

                                            <NavDropdown title="Delivery" id="basic-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <Link to="/list/deliverer">
                                                        List
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