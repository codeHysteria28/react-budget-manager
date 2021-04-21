import React from 'react';
import {MDBContainer} from "mdbreact";
import './SpendingTableEntries.css';
import payments from '../images/debit-card.png';
import travel from '../images/destination.png';
import electronics from '../images/device.png';
import clothes from '../images/fashion.png';
import gift from '../images/gift-box.png';
import groceries from '../images/groceries.png';
import hobby from '../images/mental-health.png';
import uncategorized from '../images/question.png'
import spend_total from '../images/cashier.png'
import most_exp_item from '../images/money.png'
import moment from 'moment';

const Statistics = (props) => {
    return (
        <MDBContainer>
            <p className="grey-text mt-3 stats_heading">Statistics for month: {moment().format('MMMM')}</p>
            <div className="row statisticRow">
                {props.totalAmount === null && props.mostExpItem === null && props.mostExpItemName === "" ?
                <>
                    <h1>No data recorded so far.</h1>
                </>
                :
                <>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers">€ {props.totalAmount}</h3>
                        <p className="titles">Spend Total</p>
                        <img src={spend_total} alt="travel" className="thumbnail_photo"/>
                    </div>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers">€ {props.mostExpItem}</h3>
                        <p className="titles">Most expensive item - {props.mostExpItemName}</p>
                        <img src={most_exp_item} alt="travel" className="thumbnail_photo"/>
                    </div>
                </>
                }
            </div>
            <div className="row">
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.travel} €</h3>
                    <p className="titles">Total Travel</p>
                    <img src={travel} alt="travel" className="thumbnail_photo"/>
                </div>
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.groceries} €</h3>
                    <p className="titles">Total Groceries</p>
                    <img src={groceries} alt="travel" className="thumbnail_photo"/>
                </div>
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.clothes} €</h3>
                    <p className="titles">Total Clothes</p>
                    <img src={clothes} alt="travel" className="thumbnail_photo"/>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.elect} €</h3>
                    <p className="titles">Total Electronics</p>
                    <img src={electronics} alt="travel" className="thumbnail_photo"/>
                </div>
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.hobby} €</h3>
                    <p className="titles">Total Hobby</p>
                    <img src={hobby} alt="travel" className="thumbnail_photo"/>
                </div>
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.gift} €</h3>
                    <p className="titles">Total Gifts</p>
                    <img src={gift} alt="travel" className="thumbnail_photo"/>
                </div>
            </div>

            <div className="row mt-2 mb-2">
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.appPayments} €</h3>
                    <p className="titles">Total App Payments</p>
                    <img src={payments} alt="travel" className="thumbnail_photo"/>
                </div>
                <div className="col-md my-2 cols">
                    <h3 className="numbers">{props.uncategorized} €</h3>
                    <p className="titles">Total Uncategorized</p>
                    <img src={uncategorized} alt="travel" className="thumbnail_photo"/>
                </div>
            </div>
        </MDBContainer>
    );
}

export default Statistics;