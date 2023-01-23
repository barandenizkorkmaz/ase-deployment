import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import axios from "axios";


export class UpdateBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBoxId: "",
            boxId: "",
            name: "",
            raspberryId: "",
            address: ""
        };
        this.handleChangeSearchBoxId = this.handleChangeSearchBoxId.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRaspberryId = this.handleChangeRaspberryId.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.updateBoxRequest = this.updateBoxRequest.bind(this);
        this.getBoxRequest = this.getBoxRequest.bind(this);
    }

    handleChangeSearchBoxId(event) {
        this.setState({ searchBoxId: event.target.value });
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeRaspberryId(event) {
        this.setState({ raspberryId: event.target.value });
    }

    handleChangeAddress(event) {
        this.setState({ address: event.target.value });
    }

    getBoxRequest(event) {
        event.preventDefault();
        const id = this.state.searchBoxId
        axios.get("list/" + id)
            .then(
                (response) => {
                    console.log(response)
                    this.setState({ boxId: response.data.id })
                    this.setState({ address: response.data.address })
                    this.setState({ raspberryId: response.data.raspberryId })
                    this.setState({ name: response.data.name })

                }
            )
            .catch(
                (error) => {
                    alert(`Box not found.`)
                    console.log(error)
                }
            )

    }

    updateBoxRequest(event) {
        event.preventDefault();
        const id = this.state.boxId
        axios.put("/box/update/" + id, this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(`Box updated.`)
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
                <Form onSubmit={this.getBoxRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Box ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" value={this.state.searchBoxId} onChange={this.handleChangeSearchBoxId} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Get Box
                        </Button>
                    </div>
                </Form>
                <Form onSubmit={this.updateBoxRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Box ID</Form.Label>
                        <Form.Control type="text" placeholder="Box id" value={this.state.boxId} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={this.state.name} onChange={this.handleChangeName} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Raspberry ID</Form.Label>
                        <Form.Control type="text" placeholder="Raspberry id" value={this.state.raspberryId} onChange={this.handleChangeRaspberryId} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" value={this.state.address} onChange={this.handleChangeAddress} />
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