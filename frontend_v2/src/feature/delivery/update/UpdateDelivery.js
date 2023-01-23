import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";


export class UpdateDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchDeliveryId: "",
            deliveryId: "",
            delivererId: "",
            customerId: "",
            deliveryStatus: "",
            boxId: ""
        };
        this.handleChangeSearchDeliveryId = this.handleChangeSearchDeliveryId.bind(this);
        this.handleChangeDelivererId = this.handleChangeDelivererId.bind(this);
        this.handleChangeCustomerId = this.handleChangeCustomerId.bind(this);
        this.handleChangeBoxId = this.handleChangeBoxId.bind(this);
        this.handleChangeDeliveryStatus = this.handleChangeDeliveryStatus.bind(this);
        this.updateDeliveryRequest = this.updateDeliveryRequest.bind(this);
        this.getDeliveryRequest = this.getDeliveryRequest.bind(this);
    }

    handleChangeDeliveryStatus(event) {
        this.setState({ deliveryStatus: event.target.value });
    }

    handleChangeSearchDeliveryId(event) {
        this.setState({ searchDeliveryId: event.target.value });
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

    getDeliveryRequest(event) {
        event.preventDefault();
        //this.setState({ deliveryId: event.target.value });
        const id = this.state.searchDeliveryId
        axios.get("list/" + id)
            .then(
                (response) => {
                    console.log(response)
                    this.setState({ deliveryId: response.data.id })
                    this.setState({ deliveryStatus: response.data.deliveryStatus })
                    this.setState({ customerId: response.data.customerId })
                    this.setState({ delivererId: response.data.delivererId })
                    this.setState({ deliveryStatus: response.data.deliveryStatus })
                    this.setState({ boxId: response.data.boxId })

                }
            )
            .catch(
                (error) => {
                    alert(`Delivery not found.`)
                    console.log(error)
                }
            )

    }

    updateDeliveryRequest(event) {
        event.preventDefault();
        const id = this.state.deliveryId
        axios.put("/delivery/update/" + id, this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(`Delivery updated.`)
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
                <Form onSubmit={this.getDeliveryRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Delivery ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.searchDeliveryId} onChange={this.handleChangeSearchDeliveryId} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Get Delivery
                        </Button>
                    </div>
                </Form>
                <Form onSubmit={this.updateDeliveryRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Delivery ID</Form.Label>
                        <Form.Control type="text" placeholder="Delivery id" value={this.state.deliveryId} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Deliver ID</Form.Label>
                        <Form.Control type="text" placeholder="Deliverer id" value={this.state.delivererId} onChange={this.handleChangeDelivererId} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer ID</Form.Label>
                        <Form.Control type="text" placeholder="Customer id" value={this.state.customerId} onChange={this.handleChangeCustomerId} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Box ID</Form.Label>
                        <Form.Control type="text" placeholder="Box id" value={this.state.boxId} onChange={this.handleChangeBoxId} />
                    </Form.Group>
                        <Form.Group controlId="this.state.deliveryStatus">
                          <Form.Label>Delivery status</Form.Label>
                          {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="DISPATCHED"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                onChange={this.handleChangeDeliveryStatus}
                                checked={this.state.deliveryStatus === "DISPATCHED"}
                                value="0"
                              />
                              <Form.Check
                                inline
                                label="SHIPPING"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                                onChange={this.handleChangeDeliveryStatus}
                                checked={this.state.deliveryStatus === "SHIPPING"}
                                value="1"
                              />
                              <Form.Check
                                inline
                                label="DELIVERED"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                                onChange={this.handleChangeDeliveryStatus}
                                checked={this.state.deliveryStatus === "DELIVERED"}
                                value="2"
                              />
                              <Form.Check
                                  inline
                                  label="COLLECTED"
                                  name="group1"
                                  type={type}
                                  id={`inline-${type}-3`}
                                  onChange={this.handleChangeDeliveryStatus}
                                  checked={this.state.deliveryStatus === "COLLECTED"}
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