import React from 'react'

const Person = ({ name, phone}) => {
    return (
        <li>{name}  {phone}</li>
    )
}

export default Person