import React, {useState,useEffect} from 'react';
import { MDBContainer, MDBDataTable,MDBTabPane, MDBTabContent,MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import SpendingEntryModal from "./SpendingEntryModal";
import axios from "axios";
import Swal from "sweetalert2";
import './SpendingTableEntries.css';
import Statistics from "./Statistics";

const TablePage = (props) => {
    const [spending,setSpending] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [activeItem, setActiveItem] = useState("1");

    const toggle = tab => {
        if (activeItem !== tab) {
            setActiveItem(tab);
        }
    };

    const data = {
        columns: [
            {
                label: '_id',
                field: '_id',
                sort: 'asc'
            },
            {
                label: 'Item',
                field: 'item',
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
        rows: spending
    }

    const getEntries = () => {
        axios({
            method: "POST",
            data: {
                username: props.user
            },
            withCredentials: true,
            url: "/spending",
        }).then((res) => {
            if(res.data !== {}){
                let arr = [];
                let obj = {};
                let total_amount_arr = [];
                res.data.forEach(item => {
                    if(item._id.length > 10){
                        item._id = item._id.substring(0,10);
                    }
                    obj = {
                        _id: item._id,
                        item: item.item,
                        price: '€ ' + item.price,
                        paid_at: item.paid_at
                    }
                    total_amount_arr.push(item.price);
                    arr.push(obj);
                });

                let sum_total_amount = total_amount_arr.reduce((a,b) => {
                    return a + b;
                },0);

                setTimeout(() => {
                    setTotalAmount(sum_total_amount);
                },1000);

                setSpending([...arr]);
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
                            Statistics
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        <div>
                            <h1 style={{marginRight: 15, marginTop: 25}}>Spending Breakdown</h1>
                            <SpendingEntryModal user={props.user} entryAdded={getEntries}/>
                        </div>
                        <br/>
                        <MDBDataTable responsive striped bordered small data={data} paging={true} sortable={false} info={true}/>
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        <Statistics totalAmount={totalAmount}/>
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        </>
    );
};

export default TablePage;