import React from 'react'

const Contact = ({ person }) => {
  return(
    <li>{person.name} {person.number}</li>
  )
};

export default Contact