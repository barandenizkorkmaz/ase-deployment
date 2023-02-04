import { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Row, Container } from 'react-bootstrap';
import React from 'react'
import Button from 'react-bootstrap/Button';
import { showError } from '../../../general/SendError';
import { instanceOfAxious } from '../../../network/requests';

export class UpdateBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBoxId: "",
            boxId: "",
            name: "",
            raspberryId: "",
            address: "",
            selectedBox: {},
            boxes: [],
        };
        this.handleChangeSearchBoxId = this.handleChangeSearchBoxId.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRaspberryId = this.handleChangeRaspberryId.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.updateBoxRequest = this.updateBoxRequest.bind(this);
        this.getBoxRequest = this.getBoxRequest.bind(this);
        this.getBoxes();
    }

    getBoxes() {
        instanceOfAxious.get("/box/list/all")
            .then(
                (response) => {
                    this.setState(
                        {
                            boxes: [...response.data],
                            selectedBox: response.data[0]
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

    handleChangeSearchBoxId(event) {
        this.setState({
            searchBoxId: event.target.value,
            selectedBox: this.state.boxes.find(index => index["id"] === event.target.value)
        });
    }

    handleChangeName(event) {
        this.setState({
            selectedBox: {
                ...this.state.selectedBox,
                name: event.target.value
            }
        });
    }

    handleChangeRaspberryId(event) {
        this.setState({
            selectedBox: {
                ...this.state.selectedBox,
                raspberryId: event.target.value
            }
        });
    }

    handleChangeAddress(event) {
        this.setState({
            selectedBox: {
                ...this.state.selectedBox,
                address: event.target.value
            }
        });
    }

    getBoxRequest(event) {
        event.preventDefault();
        const id = this.state.searchBoxId
        instanceOfAxious.get("list/" + id)
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
                    showError(error);
                }
            )

    }

    updateBoxRequest(event) {
        event.preventDefault();
        const id = this.state.boxId
        let updateUrl = "/box/update/" + this.state.selectedBox["id"]
        instanceOfAxious.put(updateUrl,
            {
                name: this.state.selectedBox["name"],
                address: this.state.selectedBox["address"]
            }
        )
            .then(
                (response) => {
                    console.log(response)
                    alert(`Box updated.`)
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
            {
                this.state.boxes.length !== 0 ?
                    <Row className="justify-content-md-center mt-5" xs={6} md={2}>
                        <Form onSubmit={this.updateBoxRequest}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Box ID</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={this.handleChangeSearchBoxId}>
                                    {this.state.boxes.map(function (object, i) {
                                        return <option key={i} value={object["id"]}> {object["id"]} </option>;
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" value={this.state.selectedBox["name"]} onChange={this.handleChangeName} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Address" value={this.state.selectedBox["address"]} onChange={this.handleChangeAddress} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="lg">
                                    Update
                                </Button>
                            </div>
                        </Form>
                    </Row> : <h1>No box entities exist!</h1>
            }
        </Container>
    }
}