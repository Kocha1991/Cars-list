import axios, { AxiosError } from 'axios';
import { Car } from '../types/car';

type GetUsersResponse = {
  cars: Car[];
}

export enum CarErros {
  Add = 'Unable to add a car',
  Delete = 'Unable to delete a car',
  Edit = 'Unable to update a car',
  ErrorCars = 'Can not find cars',
}

const BASE_URL = 'https://myfakeapi.com/api';

const options = {
  headers: {
    Accept: 'application/json',
  },
};

export async function getCarsAPI() {
  try {
    const { data } = await axios.get<GetUsersResponse>(
      BASE_URL + '/cars',
      options
    );

    if (!data.cars.length) {
      throw new AxiosError(CarErros.ErrorCars);
    }

    return data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return 'An unexpected error occurred';
    }
  }
}
