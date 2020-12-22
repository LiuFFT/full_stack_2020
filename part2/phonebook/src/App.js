import React, { useState } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Number from "./components/Number";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    // const [showAll, setShowAll] = useState(true)
    const [ filter, setNewFilter ] = useState('')

    // const personToShow = (event) =>{
    //     handleFilterChange(event)
    //     const copy = persons.filter(person => person.name.toLowerCase().includes(filter))
    //     console.log(copy)
    //     setPersons(copy)
    //     // setNewFilter('')
    // }

    const filterPerson = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleNameChange = (event) =>{
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) =>{
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name : newName,
            number: newNumber
        }
        // console.log(persons.find((person) => person.name === newName))
        const personExist = persons.find((person) => person.name === newName)
        if (personExist){
            console.log(`${newName} is already added to phonebook`)
            alert(`${newName} is already added to phonebook`)
        }else {
            setPersons(persons.concat(personObj))
            setNewName('')
            setNewNumber('')
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} handleFilterChange={handleFilterChange}/>
            <h2> add a new</h2>
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handlePhoneChange={handlePhoneChange} addPerson={addPerson}/>
            <h2>Numbers</h2>
            <Number filterPerson={filterPerson}/>
        </div>
    )
}

export default App