import React from 'react'

const Course = ({ course }) => {

    const Header = ({ course }) => {
      return(
        <div>
          <h1>{course.name}</h1>
        </div>
      );
    };
  
    const Content = ({ content }) => {
      return(
        <div>
          {content.map(part => 
            <Part key={part.id} part={part}></Part>)}
        </div>
      );
    };
  
    const Part = ({ part }) => {
      return(
        <div>
           <p>{part.name} {part.exercises}</p>
        </div>
      );
    };
  
    const SumOfExercises = ({ parts }) => {
      const sum = 
        parts.reduce((total, currentvalue) => total + currentvalue.exercises, 0);
      return(
        <div>
          <b>total of {sum} exercises</b>
        </div>
      )
    };
    
  
    return(
      <div>
          <Header course={course}></Header>
          <Content content={course.parts}></Content>
          <SumOfExercises parts={course.parts}></SumOfExercises>
      </div>
    )
  };

  export default Course