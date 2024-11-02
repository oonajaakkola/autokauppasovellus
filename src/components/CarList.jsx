import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [columnDefs] = useState([
    { field: 'brand', sort: 'asc' },
    { field: 'model' },
    { field: 'color' },
    { field: 'fuel' },
    { field: 'modelYear', headerName: "Year" },
    { field: 'price' },
    {
      field: '_links.self.href',
      headerName: '',
      sortable: false,
      filter: false,
      headerName: '',
      cellRenderer: params => <Button onClick={() => deleteCar(params.data._links.self.href)}>Delete</Button>
    },
    {
      field: '_links.self.href',
      headerName: '',
      sortable: false,
      filter: false,
      headerName: '',
      cellRenderer: params => <UpdateCar updateCar={updateCar} currentCar={params.data}  />
    }
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true
  };

  const autoSizeStrategy = {
    type: 'fitCellContents',
  }

  const addCar = async (car) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(car)
    }

    try {
      const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', options,);
      const data = await response.json();
      console.log('Created:', data);
      fetchCars();
    } catch (e) {
      console.error(e);
    }
  }

  const updateCar = async (url, car) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(car)
    }

    try {
      const response = await fetch(url, options,);
      const data = await response.json();
      console.log('Updated:', data);
      fetchCars();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
      const data = await response.json();
      setCars(data._embedded.cars);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCar = async (url) => {
    const options = {
      method: 'DELETE'
    };
    try {
      if (window.confirm("Do you want to delete this car?")) {
        const response = await fetch(url, options);
        if (response.ok) {
          fetchCars();
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="carlist">
      <AddCar addCar={addCar} />
      <div className="ag-theme-material" style={{ width: "95%", height: 600 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
         autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );

}
