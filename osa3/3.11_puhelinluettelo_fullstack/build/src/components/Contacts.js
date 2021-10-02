import React from 'react'
import Contact from './Contact';

const Contacts = (props) => {
  return(
    <ul>
        {props.contactsToShow.map(person => 
          <Contact key={person.id} person={person} deleteContact={props.deleteContact}/>
        )}
    </ul>
  )
};

export default Contacts