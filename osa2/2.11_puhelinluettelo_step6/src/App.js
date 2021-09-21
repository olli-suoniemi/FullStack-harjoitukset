import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault();
    let found = false
    persons.forEach((i) => {
      if (i.name === newName) {
        found = true 
      };
    });
    if (found) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('');
      setNewNumber('');
    } else {
      const contactOjb = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };
      setPersons(persons.concat(contactOjb));
      setNewName('');
      setNewNumber('');
    };
  };

  const handleNameChange = (event) => {
    console.log(Boolean(filter));
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFiltering = (event) => {
    setFilter(event.target.value);
  };

  const contactsToShow = filter 
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter handleFiltering={handleFiltering} />

      <h2>add a new</h2>
      
      <ContactForm 
        addContact={addContact} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Contacts contactsToShow={contactsToShow} />

    </div>
  )

}

export default App