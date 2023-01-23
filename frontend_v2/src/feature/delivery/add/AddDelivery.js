import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";


export class AddDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delivererId: "",
            customerId: "",
            boxId: ""
        };
        this.handleChangeDelivererId = this.handleChangeDelivererId.bind(this);
        this.handleChangeCustomerId = this.handleChangeCustomerId.bind(this);
        this.handleChangeBoxId = this.handleChangeBoxId.bind(this);
        this.createDeliveryRequest = this.createDeliveryRequest.bind(this);
    }

    handleChangeDelivererId(event) {
        this.setState({ delivererId: event.target.value });
    }

    handleChangeCustomerId(event) {
        this.setState({ customerId: event.target.value });
    }

    handleChangeBoxId(event) {
        this.setState({ boxId: event.target.value });
    }

    createDeliveryRequest(event) {
        event.preventDefault();
        axios.post("/delivery/create", this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(`New delivery created.`)
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
                <Form onSubmit={this.createDeliveryRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Deliver ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.delivererId} onChange={this.handleChangeDelivererId} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.customerId} onChange={this.handleChangeCustomerId} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Box ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.boxId} onChange={this.handleChangeBoxId} />
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