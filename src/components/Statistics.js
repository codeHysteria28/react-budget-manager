import React from 'react';
import {MDBIcon,MDBContainer} from "mdbreact";
import './SpendingTableEntries.css';

const Statistics = (props) => {
    return (
        <MDBContainer>
            <div className="statisticRow">
                {props.totalAmount === null && props.mostExpItem === null && props.mostExpItemName === "" ?
                <h1>No data recorded so far.</h1>
                :
                <>
                    <h1 className="heading">Spend Total: </h1>
                    <div className="spender">
                        <MDBIcon icon="cash-register" className="icon"/>
                        <p>€ {props.totalAmount}</p>
                    </div>
                    <br/>
                    <h1>Most expensive item:</h1>
                    <div className="spender">
                        <MDBIcon far icon="money-bill-alt" className="icon"/>
                        <p>{props.mostExpItemName} - € {props.mostExpItem}</p>
                    </div>
                </>
                }
            </div>
        </MDBContainer>
    );
}

export default Statistics;