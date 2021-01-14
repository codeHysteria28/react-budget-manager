import React from 'react';
import {MDBIcon,MDBContainer} from "mdbreact";
import './SpendingTableEntries.css';

const Statistics = (props) => {
    return (
        <MDBContainer>
            <div className="statisticRow">
                <h1 className="heading">Spend Total: </h1>
                <MDBIcon icon="cash-register" className="icon"/>
                <p>€ {props.totalAmount}</p>
            </div>
        </MDBContainer>
    );
}

export default Statistics;