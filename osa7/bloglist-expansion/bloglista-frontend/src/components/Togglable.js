import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hidden = { display: visible ? 'none' : '' }
  const showing = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hidden}>
        <Button variant="contained" onClick={toggleVisibility}>{props.buttonLabelShow}</Button>
      </div>
      <div style={showing} className="togglableContent">
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>{props.buttonLabelHide}</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabelShow: PropTypes.string.isRequired,
  buttonLabelHide: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
