/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { getCarsAPI } from './api';
import { Header } from './components/Header/Header';
import { ErrorLabel } from './components/ErrorLable/ErrorLabel';
import { TableCars } from './components/TableCars/TableCars';
import { SearchItems } from './components/SearchItems/SearchItems';
import { Car } from './types/car';
import { debounce } from 'lodash';
import { IsLoader } from './components/Loader/IsLoader';
import { ModalEdit } from './components/Modal/ModalEdit';
import { ModalDelete } from './components/Modal/ModalDelete';
import './App.scss';

export enum SelectOptions {
  Action = 'Action',
  Edit = 'Edit',
  Delete = 'Delete'
}

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [items, setItems] = useState<Car[] | null>([])
  const [query, setQuery] = useState<string>('');
  const [rowId, setRowId] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions>(SelectOptions.Action);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getCarsAPI().then((data) =>
      typeof data === 'string' ? setError(data) : setCars(data.cars)
    );
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(items))
  // }, [items])

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('items'));
  //   if (items) {
  //     setCars(items)
  //   }
  // }, [])

  const columns = [
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
          <span style={{ color: row.availability ? 'blue' : 'red' }}>
            {row.availability ? 'Available' : 'Not available'}
          </span>
        ),
        sortable: true,
      },
      {
        name: '',
        cell: (row: Car) => <select
          className='select'
          name='action'
          value={selectedOptions}
          onChange={(e) => handleChangeSelectedOptions(e, row.id)}
        > 
          <option 
            selected 
            disabled 
            value={SelectOptions.Action}
          >
            Action
          </option>
          <option value={SelectOptions.Edit}>Edite</option>
          <option value={SelectOptions.Delete}>Delete</option>
        </select>,
   
      },
    ];

  const handleChangeSelectedOptions = (
    e: React.ChangeEvent<HTMLSelectElement>,
    carId: number
  ) => {
    cars.map(car => {
      if (car.id === carId) {
        setSelectedOptions(e.target.value as SelectOptions )
        setIsModalOpen(true)
      }
    })

    setRowId(carId);
  }

  const carInRow = cars.find(item => item.id === rowId);

  const onCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOptions(SelectOptions.Action)
  }

  const removeCar = () => {
    setCars(cars.filter(car => car.id !== rowId))
    onCloseModal()
  }


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
        {selectedOptions === SelectOptions.Edit 
          ? <ModalEdit
              rowId={rowId}
              car={carInRow}
              modal={isModalOpen}
              onCloseModal={onCloseModal}
              selected={selectedOptions}
            />
          : <ModalDelete
              rowId={rowId}
              car={carInRow}
              modal={isModalOpen}
              onCloseModal={onCloseModal}
              onRemoveCar={removeCar}
              selected={selectedOptions}
            />
        }

        <ErrorLabel error={error} />
      </div>
    </div>
  );
};

export default App;
