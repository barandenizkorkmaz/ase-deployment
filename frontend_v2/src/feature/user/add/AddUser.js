import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";


export class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userType: ""
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUserType = this.handleChangeUserType.bind(this);
        this.createUserRequest = this.createUserRequest.bind(this);
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

    createUserRequest(event) {
        event.preventDefault();
        console.log(this.state);
        axios.post("", this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(`New user created.`)
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
                <Form onSubmit={this.createUserRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChangeEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChangePassword} />
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
                            value="0"
                          />
                          <Form.Check
                            inline
                            label="DELIVERER"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            onChange={this.handleChangeUserType}
                            value="1"
                          />
                          <Form.Check
                            inline
                            label="DISPATCHER"
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                            onChange={this.handleChangeUserType}
                            value="2"
                          />
                        </div>
                      ))}
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Add
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    }
}