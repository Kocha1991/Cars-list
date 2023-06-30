import React, { useState, useEffect, useMemo } from 'react';
import { getCars } from './api';

import { Header } from './components/Header/Header';
import { ErrorLabel } from './components/ErrorLabel/ErrorLabel';
import { TableCars } from './components/TableCars/TableCars';
import { SearchItems } from './components/SearchItems/SearchItems';
import { Car } from './types/car';

import './App.scss';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getCars().then((data) =>
      typeof data === 'string' ? setError(data) : setCars(data.cars)
    );
  }, []);

  const data = useMemo(() => cars, [cars])
  const columns = useMemo(
    () => [
    {
      name: 'ID',
      selector: (row: Car) => row.id,
      sortable: true
    },
    {
      name: 'Company',
      selector: (row: Car) => row.car,
      sortable: true

    },
    {
      name: 'Model',
      selector: (row: Car) => row.car_model,
      sortable: true

    },
    {
      name: 'Vin',
      selector: (row: Car) => row.car_vin,
      sortable: true
    },
    {
      name: 'Color',
      selector: (row: Car) => row.car_color,
      sortable: true
    },
    {
      name: 'Yer',
      selector: (row: Car) => row.car_model_year,
      sortable: true
    },
    {
      name: 'Price',
      selector: (row: Car) => row.price,
      sortable: true
    },
    {
      name: 'Availability',
      selector: (row: Car) => row.availability,
      sortable: true
    },
    {
      name: 'Action',
      
    }
  ], []
  );

  const [records, setRecords] = useState<Car[]>(data)

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newData = data.filter(row => {
      return row.car.toLowerCase().includes(e.target.value.toLocaleLowerCase())
    })
    setRecords(newData)
  };

  return (
    <div className='cars-body'>
      <div className="container">
        <Header />
        <SearchItems 
          handleFilter={handleFilter}
        />
        <TableCars 
          records={data}
          columns={columns}
        />

        <ErrorLabel error={error} />
      </div>
    </div>
  );
};

export default App;
