import { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { instanceOfAxious } from "../../../../network/requests";

export class ListBoxForDispatcher extends Component{

    constructor(props) {
        super(props);
        this.state = {
            boxes: [],
        }
        this.getBoxes();
    }

    getBoxes() {
        instanceOfAxious.get("/box/list/all")
            .then(
                (response) => {
                    this.setState(
                        { boxes: [...response.data] }
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

    render(){
        return(
            <Table className="mt-5 justify-content-md-center" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Adress</th>
                        <th>Raspberry Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.boxes.map((el) => {
                        return (
                            <tr key={el["id"]}>
                                <td>{el["id"]}</td>
                                <td>{el["address"]}</td>
                                <td>{el["raspberryId"]}</td>
                                <td>{el["name"]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}