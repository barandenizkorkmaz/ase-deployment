import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";


export class DeleteDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ""
        };
        this.handleChangeId = this.handleChangeId.bind(this);
        this.deleteDeliveryRequest = this.deleteDeliveryRequest.bind(this);
    }

    handleChangeId(event) {
        this.setState({ id: event.target.value });
    }

    deleteDeliveryRequest(event) {
        event.preventDefault();
        const id = this.state.id
        console.log(id)
        axios.post("delete/" + id)
            .then(
                (response) => {
                    console.log(response)
                    if(response.data.successful){
                        alert(`Delivery deleted.`)
                    }else{
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
                <Form onSubmit={this.deleteDeliveryRequest}>
                    <Form.Group classId="mb-1" >
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.id} onChange={this.handleChangeId} />
                    </Form.Group>
                    <div classId="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Delete
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    }
}