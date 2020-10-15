import React, { createContext, useReducer, useState } from 'react'
import { countriesReducer } from '../reducers/CountriesReducer'

export const CountriesContext = createContext()

const CountriesContextProvider = ({ children, serverCountries }) => {
    const [countries, dispatch] = useReducer(countriesReducer, [])
    const [sortDirection, setSortDirection] = useState(false)
    const [currentColumn, setCurrentColumn] = useState()

    async function fetchData(country) {
        const baseURL = 'https://covid19.mathdro.id/api'

        try {
            const { confirmed, recovered, deaths } = await (await fetch(baseURL + `/countries/${country}`)).json()
            const { iso2 } = serverCountries.find(ctry => ctry.name === country)

            dispatch({
                type: 'ADD_COUNTRY', country: {
                    country,
                    total: confirmed.value,
                    active: (confirmed.value - recovered.value),
                    recovered: recovered.value,
                    recoveryrate: parseFloat((recovered.value / confirmed.value * 100).toFixed(2)),
                    deaths: deaths.value,
                    deathrate: parseFloat((deaths.value / confirmed.value * 100).toFixed(2)),
                    iso2: iso2.toLowerCase()
                }
            })

            dispatch({ type: 'SORT_DESC', field: 'total' })
            setCurrentColumn('total title')

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <CountriesContext.Provider value={{ countries, dispatch, fetchData, serverCountries, sortDirection, setSortDirection, currentColumn, setCurrentColumn }}>
            {children}
        </CountriesContext.Provider>
    )
}

export default CountriesContextProvider