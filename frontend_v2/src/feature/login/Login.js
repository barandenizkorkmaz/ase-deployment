import { Component } from 'react'
import { Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loadState, saveState } from '../../localstorage/LocalStorage';
import axios from "axios";


export class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            userType: "",
            jwtToken: ""
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    sendLoginRequest(event) {
        event.preventDefault();

        axios.post("user/login", this.state)
            .then(
                (response) => {
                    // TODO: 10.01.2023 - Implement login logic.
                    console.log(response)
                    const responseData = response.data
                    const responseHeader = response.headers
                    this.setState({
                        id: responseData.id,
                        userType: responseData.userType,
                        jwtToken: response.headers.authorization.replace("Bearer ", "")
                    })
                    saveState("login",true);
                    console.log(this.state)
                }
            )
            .catch(
                (error) => {
                    // TODO: Shall we set login state as false?
                    saveState("login",false);
                    console.log(error)
                }
            )

    }

    render() {
        return <Container >
            <Row className="justify-content-md-center mt-5" xs={6} md={2}>
                <Form onSubmit={this.sendLoginRequest}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    }
}