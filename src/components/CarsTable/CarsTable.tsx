import React, { useMemo } from 'react'
import { useTable } from 'react-table';
import { Car } from '../../types/car';

type Props = {
  cars: Car[]
}

export const CarsTable: React.FC<Props> = ({
  cars
}) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => cars, [])
  const columns = useMemo(
    () => [
      {
        Header: 'Car',
        accessor: 'car'
      },
      {
        Header: 'Car Color',
        accessor: 'car_color'
      },
      {
        Header: 'Car Model',
        accessor: 'car_model'
      },
      {
        Header: 'Car Model Yer',
        accessor: 'car_model_year'
      },
      {
        Header: 'Car Vin',
        accessor: 'car_vin'
      },
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Price',
        accessor: 'price'
      },
    ], []
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <main>
       <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
    </main>
  )
}
