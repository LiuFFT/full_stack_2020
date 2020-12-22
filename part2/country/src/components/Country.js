import React, {useState} from 'react'
import CountryDetails from "./CountryDetails";

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)


const Country = ({ country}) => {
    const [show, setShow] = useState(false)

    const handleClick = () =>{
        // console.log("show")
        setShow(!show)
        // return (
        //     <div>
        //         <li>{country.name} <Button onClick={handleClick} text="show"/></li>
        //         <CountryDetails filteredCountries={country}/>
        //     </div>
        // )
    }

    return (
        <div>
            <li>{country.name} <Button onClick={handleClick} text="show"/></li>
            <div>
                {show ? <CountryDetails filteredCountries={country}/> : ''}
            </div>
        </div>
    )
}

export default Country