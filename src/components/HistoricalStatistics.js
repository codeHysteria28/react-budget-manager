import React, {useState, useEffect} from 'react';
import {MDBContainer} from "mdbreact";
import './SpendingTableEntries.css';
import payments from '../images/debit-card.png';
import travelIco from '../images/destination.png';
import electronics from '../images/device.png';
import clothesIco from '../images/fashion.png';
import giftIco from '../images/gift-box.png';
import groceriesIco from '../images/groceries.png';
import hobbyIco from '../images/mental-health.png';
import uncategorizedIco from '../images/question.png'
import spend_total from '../images/cashier.png'
import most_exp_item from '../images/money.png'
import moment from 'moment';

const HistoricalStatistics = (props) => {
    const [selMonth, setSelectedMonth] = useState('');
    const [totalAmount, setTotalAmount] = useState(null);
    const [mostExpItem, setMostExpItem] = useState(null);
    const [mostExpItemName, setMostExpItemName] = useState("");
    const [travel, setTravel] = useState(0);
    const [groceries, setGroceries] = useState(0);
    const [clothes, setClothes] = useState(0);
    const [elect, setElect] = useState(0);
    const [hobby, setHobby] = useState(0);
    const [gift, setGift] = useState(0);
    const [appPayments, setAppPayments] = useState(0);
    const [uncategorized, setUncategorized] = useState(0);
    const [data, setData] = useState(null);

    const months = [
        'Choose an option',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const selectedMonth = (e) => {
        setSelectedMonth(e.target.value);
        displayHistoricalData(e.target.value);
    }

    const displayHistoricalData = (seLectedMonth) => {
        let arr = [];
        let obj = {};
        let total_amount_arr = [];
        let total_travel = [];
        let total_groceries = [];
        let total_clothes = [];
        let total_gift = [];
        let total_hobby = [];
        let total_elect = [];
        let total_app_pay = [];
        let total_uncategorized = [];
        const current_year = moment().format('YY');

        props.bulkSpending.forEach(item => {
            // get items for current month and year
            if(item.paid_at.includes(seLectedMonth) && item.paid_at.includes(current_year)){
                obj = {
                    item: item.item,
                    category: item.category,
                    price: '€ ' + item.price,
                    paid_at: item.paid_at
                }

                // totals
                total_amount_arr.push(Number(item.price));

                // totals for each category
                if(item.category === "Travel"){
                    total_travel.push(Number(item.price));
                }else if(item.category === "Groceries") {
                    total_groceries.push(Number(item.price));
                }else if(item.category === "Clothes") {
                    total_clothes.push(Number(item.price));
                }else if(item.category === "Electronics") {
                    total_elect.push(Number(item.price));
                }else if(item.category === "Hobby") {
                    total_hobby.push(Number(item.price));
                }else if(item.category === "Gift") {
                    total_gift.push(Number(item.price));
                }else if(item.category === "App Payments") {
                    total_app_pay.push(Number(item.price));
                }else {
                    total_uncategorized.push(Number(item.price));
                }

                arr.push(obj);
            }else {
                setData(null);
            }
        });

        if(arr.length > 0){
            // travel total
            if(total_travel.length > 0) {
                const travel_total = total_travel.reduce((a,b) => {
                    return a + b;
                },0);
                setTravel(travel_total);
            }else {
                setTravel(0)
            }

            // groceries total
            if(total_groceries.length > 0) {
                const groceries_total = total_groceries.reduce((a,b) => {
                    return a + b;
                },0);
                setGroceries(groceries_total);
            }else {
                setGroceries(0);
            }

            // clothes total
            if(total_clothes.length > 0){
                const clothes_total = total_clothes.reduce((a,b) => {
                    return a + b;
                },0);
                setClothes(clothes_total);
            }else {
                setClothes(0);
            }

            // electronics total
            if(total_elect.length > 0){
                const elect_total = total_elect.reduce((a,b) => {
                    return a + b;
                });
                setElect(elect_total);
            }else {
                setElect(0);
            }

            // hobby total
            if(total_hobby.length > 0){
                const hobby_total = total_hobby.reduce((a,b) => {
                    return a + b;
                });
                setHobby(hobby_total);
            }else {
                setHobby(0);
            }

            // gift total
            if(total_gift.length > 0){
                const gift_total = total_gift.reduce((a,b) => {
                    return a + b;
                });
                setGift(gift_total);
            }else {
                setGift(0);
            }

            // app payments total
            if(total_app_pay.length > 0){
                const appPayments_total = total_app_pay.reduce((a,b) => {
                    return a + b;
                });
                setAppPayments(appPayments_total);
            }else {
                setAppPayments(0);
            }

            // uncategorized total
            if(total_uncategorized.length > 0){
                const uncategorized_total = total_uncategorized.reduce((a,b) => {
                    return a + b;
                });
                setUncategorized(uncategorized_total);
            }else {
                setUncategorized(0);
            }

            // most expensive item so far
            const most_exp_item = Math.max(...total_amount_arr);
                
            // get most expensive item name so far
            const getMostExpItemName = arr.filter(mostExpItemName => {
                return mostExpItemName.price === '€ ' + most_exp_item;
            });

            const mostExpItemName = getMostExpItemName[0].item;

            // total amount spend
            let sum_total_amount = total_amount_arr.reduce((a,b) => {
                return a + b;
            },0);

            setMostExpItem(most_exp_item.toFixed(2));
            setTotalAmount(sum_total_amount.toFixed(2));
            setMostExpItemName(mostExpItemName);

            setData([...arr]);
        }
    }

    return(
        <MDBContainer>
            <p className="grey-text mt-3 stats_heading">Select month to display Historical Data</p>
            <div className="row mb-3">
                <div className="col-md-6">
                    <select className="form-control mt-3" onChange={selectedMonth}>
                        {months.map((month,index) => {
                            return (
                                <option key={index} value={month}>{month}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
            
            {data === null ? 
                <small className="grey-text">No data to show.</small> :
            <>
                <p className="grey-text mt-5 stats_heading">Historical Statistics for: <strong>{selMonth} / {moment().format('Y')}</strong></p>
                <div className="row statisticRow">
                    <div className="col-md my-2 cols">
                        <h3 className="numbers">€ {totalAmount}</h3>
                        <p className="titles">Spend Total</p>
                        <img src={spend_total} alt="travel" className="thumbnail_photo"/>
                    </div>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers">€ {mostExpItem}</h3>
                        <p className="titles">Most expensive item - {mostExpItemName}</p>
                        <img src={most_exp_item} alt="travel" className="thumbnail_photo"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md my-2 cols">
                        <h3 className="numbers"> € {travel}</h3>
                        <p className="titles">Total Travel</p>
                        <img src={travelIco} alt="travel" className="thumbnail_photo"/>
                    </div>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers"> € {groceries}</h3>
                        <p className="titles">Total Groceries</p>
                        <img src={groceriesIco} alt="travel" className="thumbnail_photo"/>
                    </div>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers"> € {clothes}</h3>
                        <p className="titles">Total Clothes</p>
                        <img src={clothesIco} alt="travel" className="thumbnail_photo"/>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md my-2 cols">
                        <h3 className="numbers"> € {elect}</h3>
                        <p className="titles">Total Electronics</p>
                        <img src={electronics} alt="travel" className="thumbnail_photo"/>
                    </div>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers">€ {hobby}</h3>
                        <p className="titles">Total Hobby</p>
                        <img src={hobbyIco} alt="travel" className="thumbnail_photo"/>
                    </div>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers"> € {gift}</h3>
                        <p className="titles">Total Gifts</p>
                        <img src={giftIco} alt="travel" className="thumbnail_photo"/>
                    </div>
                </div>

                <div className="row mt-2 mb-2">
                    <div className="col-md my-2 cols">
                        <h3 className="numbers"> € {appPayments}</h3>
                        <p className="titles">Total App Payments</p>
                        <img src={payments} alt="travel" className="thumbnail_photo"/>
                    </div>
                    <div className="col-md my-2 cols">
                        <h3 className="numbers"> € {uncategorized}</h3>
                        <p className="titles">Total Uncategorized</p>
                        <img src={uncategorizedIco} alt="travel" className="thumbnail_photo"/>
                    </div>
                </div> 
            </> }
        </MDBContainer>
    );
};

export default HistoricalStatistics;