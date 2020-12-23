import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Number from "./components/Number";
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setNewFilter ] = useState('')


    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')

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
            axios
                .post('http://localhost:3001/persons', personObj)
                .then(response => {
                    console.log(response)
                })
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