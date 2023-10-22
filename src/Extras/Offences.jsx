import React from 'react'
import { Link } from 'react-router-dom'

export const Offences = (props) => {
  return (
    <div className='d-flex justify-content-around'>
        <h1>{props.text} {props.number}</h1>
        
    </div>
  )
}
