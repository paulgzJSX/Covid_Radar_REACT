import React, { useContext } from 'react'
import { CountriesContext } from '../context/CountriesContext'
import { trimRegionName, splitRegionName } from '../helpers/HelperFunctions'
import { macro } from '../data/data'
import { clearArrows } from '../helpers/HelperFunctions'


const MacroRegions = () => {
    const { dispatch, fetchData, serverCountries } = useContext(CountriesContext)

    const handleClick = (region) => {
        clearArrows()

        if (region === 'GLOBAL') {
            dispatch({ type: 'DELETE_ALL' })
            serverCountries.map(ctry => fetchData(ctry.name))
        } else {
            dispatch({ type: 'DELETE_ALL' })
            macro[trimRegionName(region)].map(ctry => fetchData(ctry))
        }
    }
 
    return (
        <div className='macro-regions'>
            <a href="#" onClick={e => handleClick(e.target.innerText)}>GLOBAL</a>
            {Object.keys(macro).map(region => 
                <a 
                    href="#" 
                    key={region}
                    onClick={e => handleClick(e.target.innerText)}
                >
                    {splitRegionName(region)}
                </a>)
            }
        </div>
    )
}

export default MacroRegions
