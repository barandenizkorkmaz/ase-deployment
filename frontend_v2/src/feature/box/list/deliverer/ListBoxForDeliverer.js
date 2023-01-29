import { Component } from "react";
import { loadState } from "../../../../localstorage/LocalStorage";
import { instanceOfAxious } from "../../../../network/requests";
import Table from 'react-bootstrap/Table';

export class ListBoxFroDeliverer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            boxes: [],
            currentBox: ""
        }
        this.getBoxes();
    }

    getBoxes(){
        instanceOfAxious.post("/deliverer/"+loadState("email"))
            .then(response =>{
                this.setState({
                    boxes: response.data
                })
            })
    }

    render(){
        return(
            <Table className="mt-5 justify-content-md-center" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Adress</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.boxes.map((el) => {
                        return (
                            <tr key={el["id"]}>
                                <td>{el["id"]}</td>
                                <td>{el["address"]}</td>
                                <td>{el["name"]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}