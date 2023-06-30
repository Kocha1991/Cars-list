import React from 'react'
import DataTable from 'react-data-table-component'
import { Car } from '../../types/car'

type Props = {
  columns: any
  records: Car[]
}

export const TableCars: React.FC<Props> = ({
  columns,
  records
}) => {
  return (
    <DataTable 
      columns={columns}
      data={records}
      selectableRows
      fixedHeader
      pagination
    />
  ) 
}