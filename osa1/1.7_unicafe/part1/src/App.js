import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const CalculateAverage = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        average: 0
      </div>
    )
  }
  return (
    <div>
      average: {(props.good * 1 + props.bad * -1) / (props.good + props.neutral + props.bad)}
    </div>
  )
}

const CalculatePositive = (props) => {
  if (props.all === 0) {
    return (
      <div>
        positive: 0 %
      </div>
    )
  }
  return (
    <div>
      positive: {(props.good / props.all) * 100} %
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad} <br></br>
      all {good + neutral + bad} <br></br>
      <CalculateAverage good={good} neutral={neutral} bad={bad} />
      <CalculatePositive good={good} all={good + neutral + bad} />
    </div>
  )
}

export default App