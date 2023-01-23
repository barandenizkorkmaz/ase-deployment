import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";


export class UpdateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchUserId: "",
            id: "",
            email: "",
            password: "",
            userType: ""
        };
        this.handleChangeSearchUserId = this.handleChangeSearchUserId.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUserType = this.handleChangeUserType.bind(this);
        this.updateUserRequest = this.updateUserRequest.bind(this);
        this.getUserRequest = this.getUserRequest.bind(this);
    }

    handleChangeSearchUserId(event) {
        this.setState({ searchUserId: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleChangeUserType(event) {
        this.setState({ userType: event.target.value });
    }

    getUserRequest(event) {
        event.preventDefault();
        const id = this.state.searchUserId
        axios.get("list/" + id)
            .then(
                (response) => {
                    console.log(response)
                    this.setState({ id: response.data.id })
                    this.setState({ userType: response.data.userType })
                    this.setState({ password: response.data.password })
                    this.setState({ email: response.data.email })

                }
            )
            .catch(
                (error) => {
                    alert(`User not found.`)
                    console.log(error)
                }
            )

    }

    updateUserRequest(event) {
        event.preventDefault();
        const id = this.state.id
        axios.put("/user/update", this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(`User updated.`)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )

    }

    render() {
        return <Container >
            <Row className="justify-content-md-center mt-5" xs={6} md={2}>
                <Form onSubmit={this.getUserRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.searchUserId} onChange={this.handleChangeSearchUserId} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Get User
                        </Button>
                    </div>
                </Form>
                <Form onSubmit={this.updateUserRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" placeholder="User id" value={this.state.id} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                    </Form.Group>
                        <Form.Group controlId="this.state.userType">
                          <Form.Label>User Type</Form.Label>
                          {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="CUSTOMER"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={this.handleChangeUserType}
                                checked={this.state.userType === "CUSTOMER"}
                                value="0"
                              />
                              <Form.Check
                                inline
                                label="DELIVERER"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                                onChange={this.handleChangeUserType}
                                checked={this.state.userType === "DELIVERER"}
                                value="1"
                              />
                              <Form.Check
                                inline
                                label="DISPATCHER"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                                onChange={this.handleChangeUserType}
                                checked={this.state.userType === "DISPATCHER"}
                                value="2"
                              />
                            </div>
                          ))}
                        </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Update
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    }
}