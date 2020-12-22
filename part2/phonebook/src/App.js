import React, { useState } from 'react'
import Person from "./components/Person";

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
            phone: newNumber
        }
        if (newName in persons.map(name=>name)){
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
          <div>
              filter shown with <input  value={filter} onChange={handleFilterChange}/>
          </div>
          <h2> add a new</h2>
        <form>
          <div>
            name: <input  value={newName} onChange={handleNameChange}/>
          </div>
            <div>
                phone: <input  value={newNumber} onChange={handlePhoneChange}/>
            </div>
          <div>
            <button type="submit" onClick={addPerson}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
            <ul>
                {filterPerson.map(person =>
                    <Person key={person.name} name={person.name} phone={person.number}/>
                )}
            </ul>
        </div>
      </div>
    )
}

export default App