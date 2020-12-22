import React, { useState } from 'react'
import Person from "./components/Person";

const App = () => {
    const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const handleNameChange = (event) =>{
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name : newName
        }
        setPersons(persons.concat(personObj))
        setNewName('')
    }


    return (
      <div>
        <h2>Phonebook</h2>
        <form>
          <div>
            name: <input  value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            <button type="submit" onClick={addPerson}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
            <ul>
                {persons.map(person =>
                    <Person key={person.name} name={person.name}/>
                )}
            </ul>
        </div>
      </div>
    )
}

export default App