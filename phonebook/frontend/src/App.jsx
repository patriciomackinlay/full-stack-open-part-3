import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import Error from './components/Error.jsx'
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const filteredPhonebook = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('fail')
      })
  }, [notifMessage, errorMessage])

  const addContact = (e) => {
    e.preventDefault()
    let found = persons.find(person => person.name === newName)
    if (found === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          console.log('failed to add contact')
          setErrorMessage(`failed to add ${newName}!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      if (errorMessage === null) {
      setNotifMessage(`${newName} was succesfully added!`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      }
      setNewName("")
      setNewNumber("")
    }
    else {
      if(window.confirm(`${newName} has already been added to the phonebook, do you want to update the number?`)) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        personService
          .update(updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNotifMessage(`${newName}'s number was succesfully updated!`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(failed, " inside error")
            setErrorMessage(`${newName}'s information has been removed from the server!`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }

  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
          .deletePerson(id)
          .catch(error => {
            console.log('fail')
          })
      setPersons(persons.filter(person => person.id !== id))
      setNotifMessage(`${name}'s contact information was deleted!`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message= {notifMessage} />
      <Error message= {errorMessage} />
      <Filter value={newFilter} handleChange={handleFilterChange}/>
      <h2>Add new contact</h2>
      <PersonForm addContact= {addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons phonebook={filteredPhonebook} handleDelete={handleDelete}/>
      </div>
  )
}

export default App