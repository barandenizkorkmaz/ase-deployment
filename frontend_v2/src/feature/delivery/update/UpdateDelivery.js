import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { instanceOfAxious } from '../../../network/requests';


export class UpdateDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveryStatus: "",
            selectedDelivery: {},
            deliveries: [],
        };
        this.handleChangeDelivererId = this.handleChangeDelivererId.bind(this);
        this.handleChangeCustomerId = this.handleChangeCustomerId.bind(this);
        this.handleChangeBoxId = this.handleChangeBoxId.bind(this);
        this.handleChangeSearchBoxId = this.handleChangeSearchBoxId.bind(this);
        this.handleChangeDeliveryStatus = this.handleChangeDeliveryStatus.bind(this);
        this.updateDeliveryRequest = this.updateDeliveryRequest.bind(this);
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

    handleChangeDeliveryStatus(event) {
        this.setState({ deliveryStatus: event.target.value });
    }

    handleChangeDelivererId(event) {
        this.setState({ 
            selectedDelivery: {
                ...this.state.selectedDelivery,
                delivererId : event.target.value
            }
        });
    }

    handleChangeCustomerId(event) {
        this.setState({ 
            selectedDelivery: {
                ...this.state.selectedDelivery,
                customerId : event.target.value
            }
        });    
    }

    handleChangeBoxId(event) {
        this.setState({ 
            selectedDelivery: {
                ...this.state.selectedDelivery,
                boxId : event.target.value
            }
        });
    }

    updateDeliveryRequest(event) {
        event.preventDefault();
        const id = this.state.deliveryId
        axios.put("/delivery/update/" + id,
            {
                ...this.state.selectedDelivery,
                deliveryStatus: this.state.deliveryStatus
            }
        )
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

    handleChangeSearchBoxId(event) {
        this.setState({
            selectedDelivery: this.state.deliveries.find(index => index["id"] === event.target.value),
            deliveryStatus: this.state.deliveries.find(index => index["id"] === event.target.value)["deliveryStatus"]
        });
    }

    render() {
        return <Container >
            <Row className="justify-content-md-center mt-5" xs={6} md={2}>
            <Form onSubmit={this.updateDeliveryRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Delivery ID</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={this.handleChangeSearchBoxId}>
                            {this.state.deliveries.map(function (object, i) {
                                return <option key={i} value={object["id"]}> {object["id"]} </option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Deliver Email</Form.Label>
                        <Form.Control type="text" placeholder="Deliverer Email" value={this.state.selectedDelivery["delivererEmail"]} onChange={this.handleChangeDelivererId} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer Email</Form.Label>
                        <Form.Control type="text" placeholder="Customer Email" value={this.state.selectedDelivery["customerEmail"]} onChange={this.handleChangeCustomerId} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Box ID</Form.Label>
                        <Form.Control type="text" placeholder="Box id" value={this.state.selectedDelivery["boxId"]} onChange={this.handleChangeBoxId} />
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