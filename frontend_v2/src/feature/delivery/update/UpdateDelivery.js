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
            delivererEmail: [],
            customerEmail: [],
            selectedDelivery: {},
            deliveries: [],
            boxes: []
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
        let requestList = [
            "/delivery/list/dispatcher/all",
            "/user/list/emails/deliverer",
            "/user/list/emails/customer",
            "/box/list/all"
        ]
        const requests = requestList.map((url) => instanceOfAxious.get(url));
        axios.all(requests)
            .then(
                (response) => {
                    this.setState(
                        {
                            deliveries: [...response[0].data],
                            customerEmail: [...response[2].data],
                            delivererEmail: [...response[1].data],
                            selectedDelivery: response[0].data[0],
                            deliveryStatus: response[0].data[0].deliveryStatus,
                            boxes: [...response[3].data]
                        }
                    )
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
                delivererEmail: event.target.value
            }
        });
    }

    handleChangeCustomerId(event) {
        this.setState({
            selectedDelivery: {
                ...this.state.selectedDelivery,
                customerEmail: event.target.value
            }
        });
    }

    handleChangeBoxId(event) {
        this.setState({
            selectedDelivery: {
                ...this.state.selectedDelivery,
                boxId: event.target.value
            }
        });
    }

    updateDeliveryRequest(event) {
        event.preventDefault();
        const id = this.state.selectedDelivery["id"]
        instanceOfAxious.put("/delivery/update/" + id,
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
                        <Form.Select aria-label="Default select example" onChange={this.handleChangeDelivererId}>
                            {this.state.delivererEmail.map(function (object, i) {
                                return <option key={i} value={object}> {object} </option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer Email</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={this.handleChangeCustomerId}>
                            {this.state.customerEmail.map(function (object, i) {
                                return <option key={i} value={object}> {object} </option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Box Name</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={this.handleChangeBoxId}>
                            {this.state.boxes.map(function (object, i) {
                                return <option key={i} value={object["id"]}> {object["name"]} </option>;
                            })}
                        </Form.Select>
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
                                    value="DISPATCHED"
                                />
                                <Form.Check
                                    inline
                                    label="SHIPPING"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    onChange={this.handleChangeDeliveryStatus}
                                    checked={this.state.deliveryStatus === "SHIPPING"}
                                    value="SHIPPING"
                                />
                                <Form.Check
                                    inline
                                    label="DELIVERED"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-3`}
                                    onChange={this.handleChangeDeliveryStatus}
                                    checked={this.state.deliveryStatus === "DELIVERED"}
                                    value="DELIVERED"
                                />
                                <Form.Check
                                    inline
                                    label="COLLECTED"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-3`}
                                    onChange={this.handleChangeDeliveryStatus}
                                    checked={this.state.deliveryStatus === "COLLECTED"}
                                    value="COLLECTED"
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