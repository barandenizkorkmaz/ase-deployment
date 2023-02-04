import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React from 'react'
import Button from 'react-bootstrap/Button';
import { instanceOfAxious } from '../../../network/requests';
import { loadState } from '../../../localstorage/LocalStorage';
import { showError } from '../../../general/SendError';


export class TrackDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: [],
            selectedDelivery: "",
            deliveryStatus: ""
        };
        this.handleChangeDeliveryId = this.handleChangeDeliveryId.bind(this);
        this.trackDeliveryRequest = this.trackDeliveryRequest.bind(this);
        this.getDeliveries(loadState("email"));
    }

    handleChangeDeliveryId(event) {
        this.setState({ selectedDelivery: event.target.value });
    }

    getDeliveries(customerId) {
        instanceOfAxious.get("/delivery/list/customer/active/" + customerId)
            .then(
                (response) => {
                    this.setState(
                        { 
                            deliveries: [...response.data],
                            selectedDelivery: response.data[0]["id"]
                        }
                    )
                }
            )
            .catch(
                (error) => {
                    showError(error);
                }
            )
    }

    trackDeliveryRequest(event) {
        event.preventDefault();
        instanceOfAxious.get("/delivery/" + this.state.selectedDelivery)
            .then(
                (response) => {
                    this.setState({ deliveryStatus: response.data })
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
                <Form onSubmit={this.trackDeliveryRequest}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Delivery Id</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={this.handleChangeDeliveryId}>
                            {this.state.deliveries.map(function (object, i) {
                                return <option key={i} value={object["id"]}> {object["id"]} </option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Track
                        </Button>
                    </div>
                    <div>
                        Your Delivery Status is : {this.state.deliveryStatus}
                    </div>
                </Form>
            </Row>
        </Container>
    }
}