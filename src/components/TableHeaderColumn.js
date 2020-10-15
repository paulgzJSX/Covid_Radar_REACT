import React, { useContext, useRef } from 'react'
import UpIcon from './UpIcon'
import DownIcon from './DownIcon'
import { CountriesContext } from '../context/CountriesContext'

const TableHeaderColumn = ({ column, isSelected }) => {
    const { countries, dispatch, sortDirection, setSortDirection, setCurrentColumn } = useContext(CountriesContext)
    const titleRef = useRef()

    
    const handleClick = () => {
        if (countries.length) {
            setSortDirection(!sortDirection)

            const columnName = titleRef.current.classList[0].split('-').join('')
            setCurrentColumn(titleRef.current.classList.value)
            
            sortDirection 
                ? dispatch({ type: 'SORT_DESC', field: columnName })
                : dispatch({ type: 'SORT_ASC', field: columnName })
        }
    }

    return (
        <div ref={titleRef} className={column.className} onClick={handleClick}>
            {column.title === 'Country' && <h4>{column.title}</h4>}
            {countries.length > 1 && isSelected 
                ? sortDirection ? <DownIcon /> : <UpIcon />
                : null
            }
            {column.title !== 'Country' && <h4>{column.title}</h4>}  
        </div>
    )
}

export default TableHeaderColumn
