import React from 'react'

const Contact = ({ person, deleteContact }) => {
  return(
    <li>
      {person.name} {person.number}
      <button onClick = {() => deleteContact(person)}> Delete </button>
    </li>
  )
};

export default Contact