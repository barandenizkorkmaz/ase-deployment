import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { instanceOfAxious } from '../../../network/requests';


export class DeleteBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            boxes: [],
        };
        this.handleChangeId = this.handleChangeId.bind(this);
        this.deleteBoxRequest = this.deleteBoxRequest.bind(this);
        this.getBoxes();
    }
    getBoxes() {
        instanceOfAxious.get("/box/list/all")
            .then(
                (response) => {
                    this.setState(
                        { boxes: [...response.data] }
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

    handleChangeId(event) {
        this.setState({ id: event.target.value });
    }

    deleteBoxRequest(id) {
        console.log(id)
        instanceOfAxious.post("delete/" + id)
            .then(
                (response) => {
                    console.log(response)
                    if (response.data.successful) {
                        alert(`Box deleted.`)
                        window.location.reload(false);
                    } else {
                        alert(`Box not found.`)
                    }
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
            <Row classId="justify-content-md-center mt-5" xs={6} md={2}>
                <Table className="mt-5 justify-content-md-center" striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Adress</th>
                            <th>Raspberry Id</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.boxes.map((el) => {
                            return (
                                <tr key={el["id"]}>
                                    <td>{el["id"]}</td>
                                    <td>{el["address"]}</td>
                                    <td>{el["raspberryId"]}</td>
                                    <td>{el["name"]}</td>
                                    <Button variant="primary" onClick={()=>this.deleteBoxRequest(el["id"])} type="submit" size="lg">
                                        Delete
                                    </Button>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    }
}


