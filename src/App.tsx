import React, { useState, useEffect, useMemo } from 'react';
import { getCars } from './api';

import { Header } from './components/Header/Header';
import { ErrorLabel } from './components/ErrorLabel/ErrorLabel';
import { TableCars } from './components/TableCars/TableCars';
import { SearchItems } from './components/SearchItems/SearchItems';
import { Car } from './types/car';
import { debounce } from 'lodash';
import { IsLoader } from './components/Loader/IsLoader';
import './App.scss';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getCars().then((data) =>
      typeof data === 'string' ? setError(data) : setCars(data.cars)
    );
  }, []);

  const columns = useMemo(
    () => [
      {
        name: 'ID',
        selector: (row: Car) => row.id,
        sortable: true,
      },
      {
        name: 'Company',
        selector: (row: Car) => row.car,
        sortable: true,
      },
      {
        name: 'Model',
        selector: (row: Car) => row.car_model,
        sortable: true,
      },
      {
        name: 'Vin',
        selector: (row: Car) => row.car_vin,
        sortable: true,
      },
      {
        name: 'Color',
        selector: (row: Car) => row.car_color,
        sortable: true,
      },
      {
        name: 'Yer',
        selector: (row: Car) => row.car_model_year,
        sortable: true,
      },
      {
        name: 'Price',
        selector: (row: Car) => row.price,
        sortable: true,
      },
      {
        name: 'Availability',
        selector: (row: Car) => (
          row.availability === true ? 'Available' : 'Not available'
        ),
        sortable: true,
      },
      {
        name: 'Action',
      },
    ],
    []
  );

  const debouncedSearch = debounce((arg) => {
    setQuery((arg))
  }, 800)

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    debouncedSearch(e.target.value.trim());
  };

  const visibleCars = cars.filter(row => {
    const columnsToSearchIn = [
      row.car,
      row.car_color,
      row.car_model,
      row.car_model_year.toString(),
      row.car_vin.toString(),
      row.id.toString(),
      row.price.toString(),
    ]
    
    return columnsToSearchIn.some(columnToSearch => 
      columnToSearch.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <div className='cars-body'>
      <div className='container'>
        <Header />
        <SearchItems 
          handleSearch={handleSearch}
        />
        {!cars.length && <IsLoader />}
        <TableCars 
          cars={visibleCars} 
          columns={columns} 
        />

        <ErrorLabel error={error} />
      </div>
    </div>
  );
};

export default App;
