import React from 'react'

const Language = ({language}) => {
    return (
        <li>{language}</li>
    )
}

const CountryDetails = ({filteredCountries}) => {
    return (
        <div>
            <p>capital {filteredCountries.capital}</p>
            <p>population {filteredCountries.population}</p>
            <div>
                <h2>Languages</h2>
                <ul>
                    {filteredCountries.languages.map(language =>
                        <Language key={language} language={language.name}/>
                        // <Language key={language} language={language}/>
                    )}
                </ul>
            </div>
            <div>
                {/*eslint-disable-next-line*/}
                <img src={filteredCountries.flag} style={{width: 200}}/>
            </div>
        </div>
    )
}

export default CountryDetails