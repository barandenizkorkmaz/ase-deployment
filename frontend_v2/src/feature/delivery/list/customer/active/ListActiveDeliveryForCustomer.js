import axios from "axios";
import { Component } from "react";
import Table from 'react-bootstrap/Table';

export class ListActiveDeliveryForCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: [],
        }
        this.getDeliveries("dasdasd");
    }

    getDeliveries(customerId) {
        axios.get("/delivery/list/customer/active/"+customerId)
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
                        <th>Deliverer Id</th>
                        <th>Box Id</th>
                        <th>Customer Id</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.deliveries.map((el) => {
                        return (
                            <tr key={el["id"]}>
                                <td>{el["id"]}</td>
                                <td>{el["delivererId"]}</td>
                                <td>{el["boxId"]}</td>
                                <td>{el["customerId"]}</td>
                                <td>{el["deliveryStatus"]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        )
    }
}