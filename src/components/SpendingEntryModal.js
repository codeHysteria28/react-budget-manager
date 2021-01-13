import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";

class ModalPage extends Component {
    state = {
        modal: false,
        startDate: new Date()
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    addEntry = (e) => {
        e.preventDefault();
        const entry_data = new FormData(e.target);
        const entry_obj = {};
        entry_data.forEach((val,key) => {
            entry_obj[key] = val;
        });

        entry_obj.paid_at = moment(this.state.startDate).format('MMM Do YY');

        if (entry_obj !== {}){
            axios.post('http://localhost:1998/add_spending', entry_obj).then((res) => {
                if(res.data === "Spending added successfully") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Spending added successfully',
                        confirmButtonText: `Continue`,
                    }).then((result) => {
                        if (result.isConfirmed){
                            this.toggle();
                        }else {
                            return false;
                        }
                    });
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong with registration, please try again.',
                        text: `${res.data}`
                    });
                }
            });
        }

    }

    render() {
        return (
            <>
                <MDBBtn onClick={this.toggle}>Add Entry</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Add Spending Entry</MDBModalHeader>
                    <form onSubmit={this.addEntry.bind(this)}>
                        <MDBModalBody>
                                <input type="hidden" name="username" value={this.props.user}/>
                                <label htmlFor="item" className="grey-text">
                                    Item
                                </label>
                                <input type="text" id="item" name="item" className="form-control" />
                                <br />
                                <label htmlFor="price" className="grey-text">
                                    Cost
                                </label>
                                <input type="number" name="price" id="price" className="form-control" />
                                <label htmlFor="date" className="grey-text">
                                    Date
                                </label><br/>
                                <input type="hidden" name="paid_at" value={this.state.startDate}/>
                                <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary" type="submit">Add entry</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
            </>
        );
    }
}

export default ModalPage;