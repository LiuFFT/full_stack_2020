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

    const handleDeletePerson = (event) => {
        const pid = event.target.dataset.id
        // console.log("id:",pid)
        const id = parseFloat(pid)
        // console.log(id)

        const person = persons.find(p => p.id===id);
        // const person =

        console.log("person:", person)

        const result = window.confirm(`Delete ${person.name}?`)
        if (result){
            deletePerson(id)
            alert(`${person.name} is deleted`)
        }
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
            // console.log(`${newName} is already added to phonebook`)
            // alert(`${newName} is already added to phonebook`)
            const result = window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)
            if (result){
                personService
                    .updatePerson(personExist.id,personObj)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !==personExist.id ? person : returnedPerson))
                    })
                    .catch(error => {
                        alert(
                            `the note '${personExist.name}' was already deleted from server`
                        )
                        setPersons(persons.filter(n => n.id !== personExist.id))
                    })
            }
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

    const deletePerson = (id) =>{
        personService
            .deletePerson(id)
            .finally(()=>{
                setPersons(persons.filter(p => p.id !== id))
            })
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} handleFilterChange={handleFilterChange}/>
            <h2> add a new</h2>
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handlePhoneChange={handlePhoneChange} addPerson={addPerson}/>
            <h2>Numbers</h2>
            <Number filterPerson={filterPerson} handleDeletePerson={(event)=>handleDeletePerson(event)}/>
        </div>
    )
}

export default App