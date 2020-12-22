import React, { useState } from 'react'
import Person from "./components/Person";

const App = () => {
    const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-1120909' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')

    const handleNameChange = (event) =>{
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) =>{
        setNewPhone(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name : newName,
            phone: newPhone
        }
        if (newName in persons.map(name=>name)){
            console.log(`${newName} is already added to phonebook`)
            alert(`${newName} is already added to phonebook`)
        }else {
            setPersons(persons.concat(personObj))
            setNewName('')
            setNewPhone('')
        }
    }


    return (
      <div>
        <h2>Phonebook</h2>
        <form>
          <div>
            name: <input  value={newName} onChange={handleNameChange}/>
          </div>
            <div>
                phone: <input  value={newPhone} onChange={handlePhoneChange}/>
            </div>
          <div>
            <button type="submit" onClick={addPerson}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
            <ul>
                {persons.map(person =>
                    <Person key={person.name} name={person.name} phone={person.phone}/>
                )}
            </ul>
        </div>
      </div>
    )
}

export default App