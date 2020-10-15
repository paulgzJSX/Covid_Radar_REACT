import React, { useContext } from 'react'
import { CountriesContext } from '../context/CountriesContext'
import TableHeaderColumn from './TableHeaderColumn'
import { clearArrows } from '../helpers/HelperFunctions'

const columns = [
    { title: 'Country', className: 'country title' },
    { title: 'Total', className: 'total title' },
    { title: 'Active', className: 'active title' },
    { title: 'Recovered', className: 'recovered title' },
    { title: 'R-Rate', className: 'recovery-rate title' },
    { title: 'Deaths', className: 'deaths title' },
    { title: 'D-Rate', className: 'death-rate title' },
]


const TableHeader = () => {
    const { dispatch, currentColumn, setCurrentColumn } = useContext(CountriesContext)


    const handleDelete = () => {
        dispatch({ type: 'DELETE_ALL' })
        clearArrows()
    }

    return (
        <div className='table-header'>
            {columns.map(column =>
                <TableHeaderColumn 
                    key={column.title} 
                    column={column}
                    isSelected={currentColumn === column.className}
                    setCurrentColumn={setCurrentColumn}
                 />)
            }
            <div className="delete">
                <a href="#" className="clear-all" onClick={handleDelete}>Clear</a>
            </div>
        </div>
    )
}

export default TableHeader
