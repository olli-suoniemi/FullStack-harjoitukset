import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import * as contactService from './services/contacts'
import { Notification } from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
        .then(persons => {
        setPersons(persons)
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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {    // modify existing contact
        const contactToBeModified = persons.find(i => i.name === newName);
        const changedContact = { ...contactToBeModified, number: newNumber};

        contactService
          .updateContact(changedContact)
          .then((returnedContact) => {
            setPersons(persons.map(i => i.id !== returnedContact.id ? i : returnedContact));
            setMessage(`Updated ${newName}`);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setMessage(`${contactToBeModified.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(i => i.id !== contactToBeModified.id));
          })
      };
      setNewName('');
      setNewNumber('');

    } else {
      const contactOjb = {
        name: newName,
        number: newNumber
      };
      contactService
      .create(contactOjb)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact));
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('');
          setNewNumber('');
      });
    };
  };

  const deleteContact = ( person ) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      contactService.deleteContact(person.id);
      const newPersons = []
      persons.forEach(i => {
        if(i.id !== person.id) {
          newPersons.push(i)
        };
      });
      setPersons(newPersons);
      setMessage(`Deleted ${person.name}`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    };
  };

  const handleNameChange = (event) => {
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
      <Notification message={message} />
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

      <Contacts contactsToShow={contactsToShow} deleteContact={deleteContact} />

    </div>
  )

}

export default App