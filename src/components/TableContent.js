import React, { useContext } from 'react'
import { CountriesContext } from '../context/CountriesContext'
import TableRow from './TableRow'

const TableContent = () => {
    const { countries } = useContext(CountriesContext)

    return (
        <div className='table-content'>
            {countries.length > 0 && countries.map(ctry => <TableRow key={ctry.country} ctry={ctry} />)} 
        </div>
    )
}

export default TableContent
