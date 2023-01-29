import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import QrReader from 'react-qr-scanner'
import { loadState } from '../../localstorage/LocalStorage'
import { instanceOfAxious } from '../../network/requests'

export class ScanQr extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 5000,
            result: 'Pleare Scan a Qr',
            requestSent: false
        }

        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(data) {
        if(data != null && !this.state.requestSent){
            this.sendQrRequest(data.text);
            console.log(data);
        }
    }
    sendQrRequest(data){
        const email = loadState("email")
        this.setState({...this.state,requestSent:true})
        instanceOfAxious.post("/delivery/attempt/"+data,{candidateDelivererEmail: email})
            .then(response=>{
                this.setState({
                    result: "Succesful",
                    requestSent: false
                })
            })
            .catch( err=>{
                this.setState({
                    result: "Not Succesful",
                    requestSent: false
                })
            });
        
    }
    handleError(err) {
        console.error(err)
    }
    render() {
        const previewStyle = {
            height: 240,
            width: 320,
        }

        return (
            <Container>
                <Row className="justify-content-md-center mt-5">
                <h1>{this.state.result}</h1>
                <QrReader
                    delay={this.state.delay}
                    style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />
                </Row>
            </Container>
        )
    }
}