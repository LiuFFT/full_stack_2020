import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
    const [countries, setCountries] = useState([
    ])
    const [ filter, setNewFilter ] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    console.log('render', countries.length, 'countries')

    // console.log(countries[0])

    const filterCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }


    return (
      <div style={{margin: 20}}>
          <h1>Filter</h1>
          <Filter value={filter} handleFilterChange={handleFilterChange}/>
          <Countries filteredCountries={filterCountries}/>
      </div>
    )
}

export default App