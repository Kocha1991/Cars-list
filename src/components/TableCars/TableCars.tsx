import React from 'react'
import DataTable, {TableStyles} from 'react-data-table-component'
import { Car } from '../../types/car';

import './Table.scss';

type Props = {
  columns: any
  cars: Car[]
}

const customStyles: TableStyles = {
  headRow: {
    style: {
      backgroundColor: '#cecdcd'
    }
  }
}

export const TableCars: React.FC<Props> = ({
  columns,
  cars
}) => {
  return (
    <div className='table-wrapper'>
      <DataTable 
        columns={columns}
        data={cars}
        highlightOnHover
        fixedHeader
        pagination
        customStyles={customStyles}
      />
    </div>
  ) 
}