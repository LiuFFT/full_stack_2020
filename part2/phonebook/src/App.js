import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Number from "./components/Number";
import personService from "./services/Persons"

const App = () => {
    const [persons, setPersons] = useState([
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setNewFilter ] = useState('')


    useEffect(() => {
        // console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])
    // console.log('render', persons.length, 'persons')

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
            personService
                .create(personObj)
                .then(returnedPersons => {
                    setPersons(persons.concat(returnedPersons))
                    setNewName('')
                    setNewNumber('')
                })
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