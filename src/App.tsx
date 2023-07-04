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
import { ModalDelete } from './components/Modal/ModalDelete';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';

import './App.scss';

export enum SelectOptions {
  Action = 'Action',
  Edit = 'Edit',
  Delete = 'Delete',
}

const App: React.FC = () => {
  const customCars: Car[] = JSON.parse(
    localStorage.getItem('customCars') ?? '[]'
  );
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isAddCar, setIsAddCar] = useState<boolean>(false);
  const [isCarModalOpen, setIsCarModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);

  useEffect(() => {
    if (customCars.length) {
      return setCars(customCars);
    }
    getCarsAPI().then((data) => {
      if (typeof data === 'string') {
        return setError(data);
      }

      localStorage.setItem('customCars', JSON.stringify(data.cars));
      setCars(data.cars);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      selector: (row: Car) => (row.availability ? 'Yes' : 'No'),
      cell: (row: Car) => (
        <span style={{ color: row.availability ? 'blue' : 'red' }}>
          {row.availability ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      name: '',
      cell: (row: Car) => (
        <select
          className='select'
          name='action'
          value={SelectOptions.Action}
          onChange={(e) => handleChangeSelectedOptions(e, row)}
        >
          <option selected disabled value={SelectOptions.Action}>
            Action
          </option>
          <option value={SelectOptions.Edit}>Edite</option>
          <option value={SelectOptions.Delete}>Delete</option>
        </select>
      ),
    },
  ];

  const handleChangeSelectedOptions = (
    e: React.ChangeEvent<HTMLSelectElement>,
    car: Car
  ) => {
    const action = e.target.value as SelectOptions;
    setSelectedCar(car);

    if (action === SelectOptions.Delete) {
      return setIsDeleteModalOpen(true);
    }

    return setIsCarModalOpen(true);
  };

  const onCloseModal = () => {
    if (isCarModalOpen) {
      setIsCarModalOpen(false);
    }

    if (isAddCar) {
      setIsAddCar(false);
    }

    if (isDeleteModalOpen) {
      setIsDeleteModalOpen(false);
    }

    setSelectedCar(undefined);
  };

  const removeCar = () => {
    setCars(cars.filter((car) => car.id !== selectedCar?.id));

    localStorage.setItem(
      'customCars',
      JSON.stringify(cars.filter((car) => car.id !== selectedCar?.id))
    );
    onCloseModal();
  };

  const onAddCar = () => {
    setIsCarModalOpen(true);
    setIsAddCar(true);
  };

  const onSaveCar = (newCar: Car) => {
    let updatededCars;

    if (isAddCar) {
      updatededCars = [newCar, ...cars]
    } else {
      updatededCars = cars.map(car => {

      if (car.id === newCar.id) {
        
        return newCar;
      }

      return car
      })
}

    setCars(updatededCars)

    localStorage.setItem('customCars', JSON.stringify(updatededCars));

    setIsCarModalOpen(false);
    setIsAddCar(false);
  };

  const debouncedSearch = debounce((arg) => {
    setSearch(arg);
  }, 800);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value.trim());
  };

  const visibleCars = cars.filter((row) => {
    const columnsToSearchIn = [
      row.car,
      row.car_color,
      row.car_model,
      row.car_model_year.toString(),
      row.car_vin.toString(),
      row.price.toString(),
      row.availability ? 'Yes' : 'No',
    ];

    return columnsToSearchIn.some((columnToSearch) =>
      columnToSearch === 'Yes' || columnToSearch === 'No'
        ? columnToSearch.toLowerCase() === search.toLowerCase()
        : columnToSearch.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className='cars-body'>
      <div className='container'>
        <Header />

        <div className='cars-list-option'>
          <SearchItems handleSearch={handleSearch} />
          <Button onAddCar={onAddCar} />
        </div>

        {!cars.length && <IsLoader />}

        <TableCars cars={visibleCars} columns={columns} />

        {isDeleteModalOpen && selectedCar && (
          <ModalDelete
            car={selectedCar}
            onCloseModal={onCloseModal}
            onRemoveCar={removeCar}
          />
        )}
        {isCarModalOpen && (
          <Modal
            isAddCar={isAddCar}
            car={selectedCar}
            onSubmit={onSaveCar}
            onCloseModal={onCloseModal}
          />
        )}

        <ErrorLabel error={error} />
      </div>
    </div>
  );
};

export default App;
