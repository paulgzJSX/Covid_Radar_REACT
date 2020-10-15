import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Map from './components/Map'
import MacroRegions from './components/MacroRegions';
import Search from './components/Search';
import Table from './components/Table';
import CountriesContextProvider from './context/CountriesContext'
import './index.css'

function App() {
  const [serverCountries, setServerCountries] = useState([])

  const baseURL = 'https://covid19.mathdro.id/api'

  useEffect(() => {
    const abortController = new AbortController()

    void async function getCountries() {
      try {
        let { countries } = await (await fetch(baseURL + '/countries')).json()
        setServerCountries(countries)
      } catch (e) {
        console.error(e)
      }
    }()
    return () => abortController.abort()
  }, [])

  return (
    <>
      <CountriesContextProvider serverCountries={serverCountries}>
        <Header />
        <main>
          <Search />
          <Map />
          <MacroRegions />
          <Table />
        </main>
      </CountriesContextProvider>
    </>
  );
}

export default App;
