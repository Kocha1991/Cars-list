import React from 'react'
import DataTable from 'react-data-table-component'
import { Car } from '../../types/car'

type Props = {
  columns: any
  cars: Car[]
}

export const TableCars: React.FC<Props> = ({
  columns,
  cars
}) => {
  return (
    <div className='cars-table'>
      <DataTable 
        columns={columns}
        data={cars}
        selectableRows
        fixedHeader
        pagination
      />
    </div>
  ) 
}