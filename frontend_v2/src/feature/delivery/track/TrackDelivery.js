import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { instanceOfAxious } from '../../../network/requests';


export class TrackDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveryId: "",
            delivererId: "",
            deliveryStatus: "",
            boxId: ""
        };
        this.handleChangeDeliveryId = this.handleChangeDeliveryId.bind(this);
        this.trackDeliveryRequest = this.trackDeliveryRequest.bind(this);
    }

    handleChangeDeliveryId(event) {
        this.setState({ deliveryId: event.target.value });
    }

    trackDeliveryRequest(event) {
        event.preventDefault();
        const id = this.state.deliveryId
        instanceOfAxious.get("list/" + id)
            .then(
                (response) => {
                    console.log(response)
                    this.setState({ deliveryStatus: response.data.deliveryStatus })
                    this.setState({ delivererId: response.data.delivererId })
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

    render() {
        return <Container >
            <Row className="justify-content-md-center mt-5" xs={6} md={2}>
                <Form onSubmit={this.trackDeliveryRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Delivery ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.deliveryId} onChange={this.handleChangeDeliveryId} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Track
                        </Button>
                    </div>
                    <Form.Group className="mb-3" >
                        <Form.Label>Deliverer ID</Form.Label>
                        <Form.Control type="text" placeholder="Deliverer id" value={this.state.delivererId} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Delivery Status</Form.Label>
                        <Form.Control type="text" placeholder="Delivery status" value={this.state.deliveryStatus} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Box ID</Form.Label>
                        <Form.Control type="text" placeholder="Box id" value={this.state.boxId} disabled/>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    }
}