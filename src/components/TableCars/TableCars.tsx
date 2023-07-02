import React from 'react'
import DataTable from 'react-data-table-component'
import { Car } from '../../types/car'

type Props = {
  columns: any
  cars: Car[]
}

// const customStyles = {
//   headerRow: {
//     style: {
//       backgroundColor: 'green'
//     }
//   }
// }

export const TableCars: React.FC<Props> = ({
  columns,
  cars
}) => {
  return (
    <DataTable 
      columns={columns}
      data={cars}
      highlightOnHover
      fixedHeader
      pagination
    />
  ) 
}