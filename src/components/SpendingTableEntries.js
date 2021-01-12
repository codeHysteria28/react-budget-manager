import React from 'react';
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import SpendingEntryModal from "./SpendingEntryModal";


const TablePage = (props) => {
    const data = {
        columns: [
            {
                label: '#',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Item',
                field: 'heading0',
                sort: 'asc'
            },
            {
                label: 'Cost',
                field: 'heading1',
                sort: 'asc'
            },
            {
                label: 'Date',
                field: 'heading2',
                sort: 'asc'
            }

        ],
        rows: [
            {
                'id': 1,
                'heading0': 'Cell',
                'heading1': 'Cell',
                'heading2': 'Cell'
            }
        ]
    };

    return (
        <>
            <br/><br/>
            <MDBContainer>
                <h1>Spending Table Breakdown</h1>
                <SpendingEntryModal user={props.user}/>
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