import { Component } from 'react'
import { Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loadState, saveState } from '../../localstorage/LocalStorage';
import axios from "axios";
import Cookies from 'js-cookie';
import { instanceOfAxious } from '../../network/requests';

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
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    getUserInfo(){
        instanceOfAxious.get("user/list/"+this.state.email)
            .then(
                (response)=>{
                    this.state = {
                        ...this.state,
                        email: response.data.email,
                        userType: response.data.userType,
                    };
                    saveState("email",response.data.email);
                    saveState("userType", this.state.userType);
                    saveState("login", true);
                    window.location.href = "/home";
                }
            )
    }

    sendLoginRequest(event) {
        event.preventDefault();
        let loginParams = { "email": this.state.email, "password": this.state.password }
        instanceOfAxious.post("user/login", loginParams)
            .then(
                (response) => {
                    console.log(response)
                    const responseData = response.data
                    const responseHeader = response.headers
                    this.state = {
                        ...this.state,
                        jwtToken: responseHeader['authorization'].split("Bearer")[1].toString(),
                    };
                    if(this.state.jwtToken != null){
                        let xsrfToken = Cookies.get("XSRF-TOKEN");
                        axios.defaults.headers.common['Authorization'] = 'Bearer'+this.state.jwtToken;
                        axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;
                        saveState("token", this.state.jwtToken);
                        this.getUserInfo();
                    }
                }
            )
            .catch(
                (error) => {
                    // TODO: Shall we set login state as false?
                    saveState("login", false);
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