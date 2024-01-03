import React from 'react'
import {ACTIONS} from './Calculator'
function NumberButton({digit, dispatch}) {
  return (
    <button onClick={ () => dispatch({type : ACTIONS.ADD, payload : {digit}})}>
    {digit}</button>
  )
}

export default NumberButton