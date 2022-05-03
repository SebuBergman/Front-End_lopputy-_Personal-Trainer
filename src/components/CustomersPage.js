import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function CustomersPage() {
    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')){
        fetch(link.value, {method: 'DELETE'})
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
       }
   }

/*
    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, { method: 'DELETE' })
            .then(response => {
            if (response.ok) {
                setOpen(true);
                fetchCustomers();
            }
            else {
                alert('Something went wrong');
            }
            })
        }
    }

    const addCustomer = (customer) => {
        fetch(process.env.REACT_APP_API_URL,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
            })
            .then(response => {
            if (response.ok) {
                fetchCustomers();
            }
            else {
                alert('Something went wrong when adding car');
            }
            })
            .catch(err => console.error(err))
            }

    const deleteCustomer = (params) => {
        console.log(params);
    }

    const updateCustomer = (updatedCustomer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(updatedCustomer)
    })
    .then(response => {
      if (response.ok) {
        setMsg('Car edited succesfully');
        setOpen(true);
        fetchCustomers();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }*/

    const columns = [
        { field: 'firstname', sortable: true, filter: true, width: 140 },
        { field: 'lastname', sortable: true, filter: true, width: 140 },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 110 },
        { field: 'city', sortable: true, filter: true, width: 110 },
        {
        headerName: 'Self',
        width: 100,
        field: 'links.0.href',
        cellRenderer: params => <button onClick={() => deleteCustomer(params)}>Delete</button>
        }
    ]

    return (
        <>
        <div className="ag-theme-material" style={{ height: 600, width: '90%' }}>
            <AgGridReact
            columnDefs={columns}
            rowData={customer}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            />
        </div>
        <Snackbar
            open={open}
            message="Car deleted"
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
        />
        </>
    )
}

export default CustomersPage;