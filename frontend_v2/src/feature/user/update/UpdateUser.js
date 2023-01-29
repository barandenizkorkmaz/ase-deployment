import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { instanceOfAxious } from '../../../network/requests';


export class UpdateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedUser: {},
            userEmail: ""
        };
        this.handleChangeSearchUserId = this.handleChangeSearchUserId.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUserType = this.handleChangeUserType.bind(this);
        this.updateUserRequest = this.updateUserRequest.bind(this);
        this.handleChangeSearchBoxId = this.handleChangeSearchBoxId.bind(this);
        this.getUsers();
    }

    handleChangeSearchUserId(event) {
        this.setState({ 
            selectedUser: {
                ...this.state.selectedUser,
                userId:event.target.value
            }
        });
    }

    handleChangeEmail(event) {
        this.setState({ 
            selectedUser: {
                ...this.state.selectedUser,
                email:event.target.value
            }
        });
    }

    handleChangePassword(event) {
        this.setState({ 
            selectedUser: {
                ...this.state.selectedUser,
                password:event.target.value
            }
        });
    }

    handleChangeUserType(event) {
        this.setState({ 
            selectedUser: {
                ...this.state.selectedUser,
                userType:event.target.value
            }
        });
    }

    getUsers() {
        instanceOfAxious.get("/user/list/all")
            .then(
                (response) => {
                    this.setState(
                        { 
                            users: [...response.data],
                            selectedUser: response.data[0],
                        }
                    )
                    console.log(this.state.deliveries);
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    updateUserRequest(event) {
        event.preventDefault();
        instanceOfAxious.put("/user/update/"+this.state.userEmail, this.state.selectedUser)
            .then(
                (response) => {
                    console.log(response)
                    alert(`User updated.`)
                    window.location.reload(false);
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )

    }

    handleChangeSearchBoxId(event) {
        this.setState({
            selectedUser: this.state.users.find(index => index["email"] === event.target.value),
            userEmail: event.target.value
        });
    }

    render() {
        return <Container >
            <Row className="justify-content-md-center mt-5" xs={6} md={2}>
                <Form onSubmit={this.updateUserRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>User Email</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={this.handleChangeSearchBoxId}>
                            {this.state.users.map(function (object, i) {
                                return <option key={i} value={object["email"]}> {object["email"]} </option>;
                            })}
                        </Form.Select>                    
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={this.state.selectedUser["email"]} onChange={this.handleChangeEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.selectedUser["password"]} onChange={this.handleChangePassword} />
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
                                checked={this.state.selectedUser["userType"] === "CUSTOMER"}
                                value="CUSTOMER"
                              />
                              <Form.Check
                                inline
                                label="DELIVERER"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                                onChange={this.handleChangeUserType}
                                checked={this.state.selectedUser["userType"] === "DELIVERER"}
                                value="DELIVERER"
                              />
                              <Form.Check
                                inline
                                label="DISPATCHER"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                                onChange={this.handleChangeUserType}
                                checked={this.state.selectedUser["userType"] === "DISPATCHER"}
                                value="DISPATCHER"
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