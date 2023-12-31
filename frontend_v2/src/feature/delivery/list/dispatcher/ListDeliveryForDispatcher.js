import axios from "axios";
import { Component } from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import QRCode from "react-qr-code";
import { instanceOfAxious } from "../../../../network/requests";

export class ListDeliveryForDispatcher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: [],
            showQr: false,
            boxes:[],
            currentDelivery: "",
        }
        this.getDeliveries();
        this.generateQr = this.generateQr.bind(this);
    }

    getBoxes() {
        instanceOfAxious.get("/box/list/all")
            .then(
                (response) => {
                    this.setState(
                        { 
                            ...this.state,
                            boxes: [...response.data]
                        },()=>{
                            console.log(this.state);
                        }
                    )
                    
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    getDeliveries() {
        let requestList = [
            "/box/list/all",
            "",
        ]
        const requests = requestList.map((url) => instanceOfAxious.get(url));
        axios.all(requests)
            .then(
                (response) => {
                    this.setState(
                        { 
                            deliveries: [...response[1].data],
                            boxes: [...response[0].data],
                         }
                    )
                    console.log(this.state.deliveries);
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    generateQr(deliverer) {
        if(this.state.showQr){
            if(deliverer["id"] === this.state.currentDelivery["id"]){
                this.setState(
                    {
                        showQr: !this.state.showQr,
                    }
                )
                console.log("showQr" + this.state.showQr);
            }else{
                this.setState(
                    {
                        currentDelivery: deliverer
                    }
                )
            }
        }else{
            this.setState(
                {
                    showQr: !this.state.showQr,
                    currentDelivery: deliverer
                }
            )
            console.log("showQr" + this.state.showQr);
        }
    }

    render() {
        return (
            <Table className="mt-5 justify-content-md-center" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Deliverer Email</th>
                        <th>Box Id</th>
                        <th>Box Name</th>
                        <th>Customer Email</th>
                        <th>Status</th>
                        <th>Generate Qr</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.deliveries.map((el) => {
                        return (
                            <tr key={el["id"]}>
                                <td>{el["id"]}</td>
                                <td>{el["delivererEmail"]}</td>
                                <td>{el["boxId"]}</td>
                                <td>{this.state.boxes.find(index=>index["id"]===el["boxId"])["name"]}</td>
                                <td>{el["customerEmail"]}</td>
                                <td>{el["deliveryStatus"]}</td>
                                <td>
                                    <Button onClick={() => this.generateQr(el)}>
                                        {
                                            this.state.showQr && el["id"] === this.state.currentDelivery["id"] ? "Close Qr" : "Generate"
                                        }
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                {
                    this.state.showQr ?
                        <QRCode
                            className="mt-5"
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={this.state.currentDelivery["id"]}
                            viewBox={`0 0 256 256`}
                        />
                        : <div />
                }
            </Table>

        )
    }
}