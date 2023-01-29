import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import QrReader from 'react-qr-scanner'
import { instanceOfAxious } from '../../network/requests'

export class ScanQr extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 1000,
            result: 'Pleare Scan a Qr',
        }

        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(data) {
        this.sendQrRequest(data);
        if(data != null && data != undefined){
            console.log(data);
        }
    }
    sendQrRequest(data){
        instanceOfAxious.post("/attempt/"+data)
            .then(response=>{
                this.setState({
                    result: "Succesful",
                })
            })
            .catch( err=>{
                this.setState({
                    result: "Not Succesful",
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