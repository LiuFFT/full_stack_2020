import React from 'react'
import Country from "./Country";
import CountryDetails from "./CountryDetails";

const Countries = (prop) => {

    if (prop.filteredCountries.length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }else if (prop.filteredCountries.length <= 10 && prop.filteredCountries.length > 1){
        return (
            <div>
                <ul>
                    {prop.filteredCountries.map(country =>
                        <Country key={country.name} name={country.name}/>
                    )}
                </ul>
            </div>
        )
    }else if (prop.filteredCountries.length === 1){
        console.log(prop.filteredCountries[0])
        return (
            <div>
                <CountryDetails filteredCountries={prop.filteredCountries[0]}/>
            </div>
        )
    }else {
        return (
            <div></div>
        )
    }


}

export default Countries