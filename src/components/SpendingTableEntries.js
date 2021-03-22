import React, {useState,useEffect} from 'react';
import { MDBContainer, MDBDataTable,MDBTabPane, MDBTabContent,MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import SpendingEntryModal from "./SpendingEntryModal";
import axios from "axios";
import Swal from "sweetalert2";
import './SpendingTableEntries.css';
import Statistics from "./Statistics";
import * as Sentry from "@sentry/react";

const TablePage = (props) => {
    const [spending,setSpending] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [activeItem, setActiveItem] = useState("1");
    const [mostExpItem, setMostExpItem] = useState(null);
    const [mostExpItemName, setMostExpItemName] = useState("");

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
                res.data.forEach(item => {

                    obj = {
                        item: item.item,
                        category: item.category,
                        price: '€ ' + item.price,
                        paid_at: item.paid_at
                    }

                    total_amount_arr.push(Number(item.price));
                    arr.push(obj);
                });

                if(arr.length > 0){
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
                        <Statistics totalAmount={totalAmount} mostExpItem={mostExpItem} mostExpItemName={mostExpItemName}/> 
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        </>
    );
};

export default Sentry.withProfiler(TablePage);