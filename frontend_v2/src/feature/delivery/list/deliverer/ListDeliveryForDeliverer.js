import axios from "axios";
import { Component } from "react";
import Table from 'react-bootstrap/Table';
import { loadState } from "../../../../localstorage/LocalStorage";
import { instanceOfAxious } from "../../../../network/requests";

export class ListDeliveryForDeliverer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: [],
        }
        this.getDeliveries(loadState("email"));
    }

    getDeliveries(delivererId) {
        instanceOfAxious.get("/delivery/list/deliverer/"+delivererId)
            .then(
                (response) => {
                    this.setState(
                        { deliveries: [...response.data] }
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

    render() {
        return (
            <Table className="mt-5 justify-content-md-center" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Deliverer Email</th>
                        <th>Box Name</th>
                        <th>Customer Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.deliveries.map((el) => {
                        return (
                            <tr key={el["id"]}>
                                <td>{el["id"]}</td>
                                <td>{el["delivererEmail"]}</td>
                                <td>{el["boxName"]}</td>
                                <td>{el["customerEmail"]}</td>
                                <td>{el["deliveryStatus"]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        )
    }
}