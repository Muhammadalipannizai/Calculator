import React from 'react'
import { ACTIONS } from './Calculator'

function OperationBtn( {dispatch, operation}) {
  return (
    <button onClick={ ()=> dispatch({type : ACTIONS.SELECT_OPERATION, payload : {operation}})}>
        {operation}
    </button>
  )
}

export default OperationBtn