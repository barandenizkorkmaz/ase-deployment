import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React from 'react'
import Button from 'react-bootstrap/Button';
import { instanceOfAxious } from '../../../network/requests';
import { showError } from '../../../general/SendError';


export class AddBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: ""
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRaspberryId = this.handleChangeRaspberryId.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.createBoxRequest = this.createBoxRequest.bind(this);
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

    createBoxRequest(event) {
        event.preventDefault();
        instanceOfAxious.post("", this.state)
            .then(
                (response) => {
                    console.log(response)
                    alert(`New box created.`)
                }
            )
            .catch(
                (error) => {
                    showError(error);
                }
            )

    }

    render() {
        return <Container >
            <Row className="justify-content-md-center mt-5" xs={6} md={2}>
                <Form onSubmit={this.createBoxRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleChangeName} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" value={this.state.address} onChange={this.handleChangeAddress} />
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