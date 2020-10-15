import React, { useContext } from 'react'
import { CountriesContext } from '../context/CountriesContext'

const TableRow = ({ ctry }) => {
    const { dispatch } = useContext(CountriesContext)

    const handleClick = () => {
        dispatch({ type: 'DELETE_COUNTRY', country: ctry.country })
    }

    return (
        <div className='table-row'>
            <div className="country">
                {ctry.iso2 && <img src={require(`../images/flags/${ctry.iso2}.svg`)} alt="" />}
                <p>{ctry.country}</p>
            </div>
            <div className="total">
                {ctry.total > 500000 
                    ? <p style={{background: 'red', color: 'white', opacity: .4}}>{ctry.total.toLocaleString()}</p>
                    : <p>{ctry.total.toLocaleString()}</p>} 
            </div>
            <div className="active">
                <p>{ctry.active.toLocaleString()}</p>
            </div>
            <div className="recovered">
                <p>{ctry.recovered.toLocaleString()}</p>
            </div>
            <div className="recovery-rate">
                <p>{ctry.recoveryrate}%</p>
            </div>
            <div className="deaths">
                <p>{ctry.deaths.toLocaleString()}</p>
            </div>
            <div className="death-rate">
                <p>{ctry.deathrate}%</p>
            </div>
            <div className="delete" onClick={handleClick}>
                <span className='delete-btn'>
                    <i id='delete' data-country='Spain' className="fa fa-minus-circle" aria-hidden="true"></i>
                </span>
            </div>
        </div>
    )
}

export default TableRow
