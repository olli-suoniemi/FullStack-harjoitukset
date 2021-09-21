import React, { useState } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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