import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import QrReader from 'react-qr-scanner'

export class ScanQr extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 1000,
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(data) {
        this.setState({
            result: data,
        })
        if(data != null && data != undefined){
            console.log(data);
        }
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
                <h1>Pleare Scan a Qr</h1>
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