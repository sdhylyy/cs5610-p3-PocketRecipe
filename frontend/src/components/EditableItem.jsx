import React from 'react'
import { useState, useEffect } from 'react'
import './EditableItem.css'
import PropTypes from 'prop-types'

const EditableItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title, defaultText, submitFunc, optType, idx } = props
  const [isE, setIsE] = useState(false)
  useEffect(() => {
    console.log()
  }, [isE])

  const toggleEditing = (e) => {
    if (isE) {
      submitFunc(e)
    }
    setIsE(!isE)
  }

  return (
    <div className="editable-item">
      {title + ': '}
      {

        isE ?
          <input className="editable-item-input"
            id={`${idx}-${optType}`}
            autoFocus
            defaultValue={defaultText}
            onBlur={toggleEditing}
          />
          :
          <div className="editable-item-display"
            onClick={toggleEditing}
          >
            {defaultText}
          </div>
      }
    </div>
  )
}

EditableItem.propTypes = {
  title: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  submitFunc: PropTypes.func.isRequired,
  optType: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired
}

export default EditableItem