import { useMemo } from 'react';
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

import { IndeterminateCheckbox } from './IndeterminateCheckbox';

export function Table({ personList, handlePersonDelete }) {
    const data = useMemo(() => personList, [personList])
    const columns = useMemo(() => [
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: false
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Website',
            accessor: 'website',
        }
    ], [personList])

    const defaultColumn = useMemo(() => {
        return {
            disableSortBy: true
        }
    }, [])
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
    } = useTable(
        { 
            columns, 
            data,
            initialState: {
                pageSize: 5
            },
            defaultColumn
        },
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                const idColumn = columns.shift();

                return [
                    {
                        id: 'selection',
                        Cell: (props) => {
                            const { checked, onChange } = props.row.getToggleRowSelectedProps();

                            function checkActiveCheckbox(e) {
                                if (checked && props.selectedFlatRows.length === 1) {
                                    return
                                }
                                onChange(e)
                            }

                            return <IndeterminateCheckbox {...props.row.getToggleRowSelectedProps()} onChange={checkActiveCheckbox} />
                        }
                    },
                    idColumn,
                    {
                        id: 'link',
                        Cell: ({ row }) => {
                            return <Link to={`/users/${row.original.id}`}>Подробнее</Link>
                        }
                    },
                    ...columns,
                    {
                        id: 'clear',
                        Cell: ({ row }) => {
                            return <span className="cursor" onClick={() => handlePersonDelete(row.original)}>&#10006;</span>
                        }
                    }
                ]
            })
        }
    )

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {!column.disableSortBy && (
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : '⟜'}
                                            </span>
                                        )}
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="buttons_wrapper">
                <strong>{state.pageIndex + 1} из {pageOptions.length}</strong>
                <button className="cursor" onClick={previousPage} disabled={!canPreviousPage} >Следующая</button>
                <button className="cursor" onClick={nextPage} disabled={!canNextPage} >Предыдущая</button>
            </div>
        </>
    )
}