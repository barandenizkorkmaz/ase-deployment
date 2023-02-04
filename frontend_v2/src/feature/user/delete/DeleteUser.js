import { Component } from 'react'
import Table from 'react-bootstrap/Table';
import { Row, Container } from 'react-bootstrap';
import React from 'react'
import Button from 'react-bootstrap/Button';
import { instanceOfAxious } from '../../../network/requests';
import { showError } from '../../../general/SendError';
import { loadState, saveState } from '../../../localstorage/LocalStorage';
import { logout } from '../../../general/Logout';


export class DeleteUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            users: []
        };
        this.handleChangeId = this.handleChangeId.bind(this);
        this.deleteUserRequest = this.deleteUserRequest.bind(this);
        this.getUsers();
    }

    getUsers() {
        instanceOfAxious.get("/user/list/all")
            .then(
                (response) => {
                    this.setState(
                        { users: [...response.data] }
                    )
                    console.log(this.state.deliveries);
                }
            )
            .catch(
                (error) => {
                    showError(error);
                }
            )
    }

    handleChangeId(event) {
        this.setState({ id: event.target.value });
    }

    deleteUserRequest(id) {
        instanceOfAxious.post("delete/" + id)
            .then(
                (response) => {
                    console.log(response)
                    alert(`User deleted.`)
                    let loginUserEmail = loadState("email");
                    if(loginUserEmail === id){
                        logout();
                    }
                }
            )
            .catch(
                (error) => {
                    showError(error);
                }
            )

    }

    render() {
        return <Container >
            <Row classId="justify-content-md-center mt-5" xs={6} md={2}>
                <Table className="mt-5 justify-content-md-center" striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((el) => {
                            return (
                                <tr key={el["id"]}>
                                    <td>{el["id"]}</td>
                                    <td>{el["email"]}</td>
                                    <td>{el["userType"]}</td>
                                    <td>
                                        <Button onClick={() => this.deleteUserRequest(el["email"])} variant="primary" type="submit" size="lg">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    }
}