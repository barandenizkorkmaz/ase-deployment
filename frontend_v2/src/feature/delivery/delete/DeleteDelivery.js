import { Component } from 'react'
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { instanceOfAxious } from '../../../network/requests';


export class DeleteDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            deliveries: [],
        };
        this.handleChangeId = this.handleChangeId.bind(this);
        this.deleteDeliveryRequest = this.deleteDeliveryRequest.bind(this);
        this.getDeliveries();
    }

    getDeliveries() {
        instanceOfAxious.get("/delivery/list/dispatcher/all")
            .then(
                (response) => {
                    this.setState(
                        { deliveries: [...response.data] }
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

    deleteDeliveryRequest(id) {
        instanceOfAxious.post("delete/" + id)
            .then(
                (response) => {
                    console.log(response)
                    if (response.data.successful) {
                        alert(`Delivery deleted.`)
                        window.location.reload(false);
                    } else {
                        alert(`Delivery not found.`)
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
                            <th>Deliverer Id</th>
                            <th>Box Id</th>
                            <th>Customer Id</th>
                            <th>Status</th>
                            <th>Generate Qr</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deliveries.map((el) => {
                            return (
                                <tr key={el["id"]}>
                                    <td>{el["id"]}</td>
                                    <td>{el["delivererId"]}</td>
                                    <td>{el["boxId"]}</td>
                                    <td>{el["customerId"]}</td>
                                    <td>{el["deliveryStatus"]}</td>
                                    <td><Button onClick={() => this.deleteDeliveryRequest(el["id"])}>Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    }
}