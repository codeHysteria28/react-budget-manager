import React, {useState,useEffect} from 'react';
import { MDBContainer, MDBDataTable,MDBTabPane, MDBTabContent,MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import SpendingEntryModal from "./SpendingEntryModal";
import axios from "axios";
import Swal from "sweetalert2";
import './SpendingTableEntries.css';
import Statistics from "./Statistics";
import * as Sentry from "@sentry/react";
import toast, { Toaster } from 'react-hot-toast';

const TablePage = (props) => {
    const [spending,setSpending] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [activeItem, setActiveItem] = useState("1");
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

    const data_loaded = () => toast.success('Data loaded successfully.');

    const toggle = tab => {
        if (activeItem !== tab) {
            setActiveItem(tab);
        }
    };

    const data = {
        columns: [
            {
                label: 'Item',
                field: 'item',
                sort: 'asc'
            },
            {
                label: 'Item Category',
                field: 'category',
                sort: 'asc'
            },
            {
                label: 'Cost',
                field: 'price',
                sort: 'asc'
            },
            {
                label: 'Date',
                field: 'paid_at',
                sort: 'asc'
            }

        ],
        rows: spending || []
    }

    const getEntries = () => {
        axios({
            method: "POST",
            data: {
                username: props.user
            },
            withCredentials: true,
            url: "https://budget-manager-app28.herokuapp.com/spending",
        }).then((res) => {
            if(res.data !== {}){
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
                res.data.forEach(item => {
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

                    // most expensive item name
                    const mostExpItemName = getMostExpItemName[0].item;

                    // total amount spend
                    let sum_total_amount = total_amount_arr.reduce((a,b) => {
                        return a + b;
                    },0);

                    setTimeout(() => {
                        setMostExpItem(most_exp_item.toFixed(2));
                        setTotalAmount(sum_total_amount.toFixed(2));
                        setMostExpItemName(mostExpItemName);
                    },1000);

                    setSpending([...arr]);
                }
                data_loaded();
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error with getting entries, please try again later.'
                });
            }
        });
    };

    useEffect(()=> {
        getEntries();
    },[]);
    
    return (
        <>
            <br/><br/>
            <MDBContainer>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => toggle("1")} role="tab" >
                            Spending Breakdown
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === "2"} onClick={() => toggle("2")} role="tab" >
                            Income Breakdown
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === "3"} onClick={() => toggle("3")} role="tab" >
                            Statistics
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        <br/>
                        <div>
                            {/* <h1 style={{marginRight: 15, marginTop: 25}}>Spending Breakdown</h1> */}
                            <SpendingEntryModal user={props.user} entryAdded={getEntries}/>
                        </div>
                        <br/>
                        <MDBDataTable responsive striped bordered small data={data} paging={true} sortable={false} info={true}/>
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                         
                    </MDBTabPane>
                    <MDBTabPane tabId="3" role="tabpanel">
                        <Statistics
                        travel={travel}
                        groceries={groceries}
                        clothes={clothes}
                        elect={elect}
                        hobby={hobby}
                        gift={gift}
                        appPayments={appPayments}
                        uncategorized={uncategorized} 
                        totalAmount={totalAmount} 
                        mostExpItem={mostExpItem} 
                        mostExpItemName={mostExpItemName}/> 
                    </MDBTabPane>
                </MDBTabContent>
                <Toaster/>
            </MDBContainer>
        </>
    );
};

export default Sentry.withProfiler(TablePage);