import axios from "axios";
import { Component } from "react";
import Table from 'react-bootstrap/Table';

export class ListUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
        this.getUsers();
    }

    getUsers() {
        axios.post("/user/list/all")
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
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <Table className="mt-5 justify-content-md-center" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>User Type</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map((el) => {
                        return (
                            <tr key={el["id"]}>
                                <td>{el["id"]}</td>
                                <td>{el["email"]}</td>
                                <td>{el["userType"]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        )
    }
}