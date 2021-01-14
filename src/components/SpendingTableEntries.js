import React, {useState,useEffect} from 'react';
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import SpendingEntryModal from "./SpendingEntryModal";
import axios from "axios";
import Swal from "sweetalert2";


const TablePage = (props) => {
    const [spending,setSpending] = useState(null);

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
                    arr.push(obj);
                });
                setSpending(arr);
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error with getting entries, please try again later.'
                });
            }
        });
    }

    useEffect(()=> {
       getEntries();
    },[getEntries]);

    return (
        <>
            <br/><br/>
            <MDBContainer>
                <div>
                    <h1 style={{marginRight: 15}}>Spending Table Breakdown</h1>
                    <SpendingEntryModal user={props.user}/>
                </div>
                <br/>
                <MDBTable responsiveSm>
                    <MDBTableHead columns={data.columns} />
                    <MDBTableBody rows={data.rows} />
                </MDBTable>
            </MDBContainer>
        </>
    );
};

export default TablePage;