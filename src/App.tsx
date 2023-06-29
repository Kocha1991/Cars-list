import React, { useState, useEffect } from 'react';

import { getCars } from './api';

import { Header } from './components/Header/Header';
import { CarsTable } from './components/CarsTable/CarsTable';
import { Car } from './types/car';
import { ErrorLabel } from './components/ErrorLabel/ErrorLabel';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getCars().then((data) =>
      typeof data === 'string' ? setError(data) : setCars(data.cars)
    );
  }, []);

  console.log(cars);
  return (
    <div className='cars-list container'>
      <Header />
      <CarsTable cars={cars}/>
      <ErrorLabel error={error} />
    </div>
  );
};

export default App;
