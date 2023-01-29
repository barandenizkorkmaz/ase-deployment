import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { instanceOfAxious } from '../../../network/requests';


export class AddDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delivererEmail: [],
            customerEmail: [],
            boxes:[],
            selectedDelivery: {},
        };
        this.handleChangeDelivererId = this.handleChangeDelivererId.bind(this);
        this.handleChangeCustomerId = this.handleChangeCustomerId.bind(this);
        this.handleChangeBoxId = this.handleChangeBoxId.bind(this);
        this.createDeliveryRequest = this.createDeliveryRequest.bind(this);
        this.getInfoForUsers();
    }

    getInfoForUsers() {
        let requestList = [
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
                            customerEmail: [...response[1].data],
                            delivererEmail: [...response[0].data],
                            boxes: [...response[2].data],
                            selectedDelivery:{
                                customerEmail: response[1].data[0],
                                delivererEmail: response[0].data[0],
                                boxId: response[2].data[0]["id"]
                            }
                        }
                    )
                    console.log(this.response[0]);
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    handleChangeBoxId(event) {
        this.setState({ 
            selectedDelivery: {
                ...this.state.selectedDelivery,
                boxId:event.target.value
            }
         });
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

    createDeliveryRequest(event) {
        event.preventDefault();
        instanceOfAxious.post("/delivery/create", this.state.selectedDelivery)
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