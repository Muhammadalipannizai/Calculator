import React, { useReducer } from 'react'
import './main.css'
import NumberButton from './NumberButton'
import OperationBtn from './OperationBtn'

export const ACTIONS = {
    ADD :'add-number',
    SELECT_OPERATION : 'select-operation',
    CLEAR_ALL : 'clear-all',
    DELETE_NUMBER : 'delete-numbers',
    EQUAL : 'equal-operation'
}

const reducer = (state, {type , payload}) => {
    switch(type){
        case ACTIONS.ADD:
            if(state.overwrite){
                return{
                    ...state,
                    currentValue: payload.digit,
                    overwrite:false,
                }
            }
            if(state.currentValue === '0' && payload.digit === '0') return state;
            if(state.currentValue == null && payload.digit === '.') return  {
                ...state,
                currentValue : `${state.currentValue || ""}${payload.digit}`,
            }
            if(payload.digit === '.' && state.currentValue.includes('.')) return state;
            return{
                ...state,
                currentValue: `${state.currentValue || ""}${payload.digit}`,
            };

        case ACTIONS.SELECT_OPERATION:
            if(state.currentValue == null && state.previousValue == null){
                return state;
            }
            if(state.currentValue == null) {
                return{
                    ...state,
                    operation : payload.operation
                }
            }
            if(state.previousValue == null){
                return {
                    ...state,
                    operation : payload.operation,
                    previousValue : state.currentValue,
                    currentValue : null,
                }
            }
            if(state.previousValue == null){
                return{
                    ...state,
                    operation : payload.operation,
                    previousValue : state.currentValue,
                    currentValue: null
                }
            }
            return{
                ...state,
                operation : payload.operation,
                previousValue : evaluate(state),
                currentValue : null,
            }
        case ACTIONS.CLEAR_ALL:
            return {};

        case ACTIONS.DELETE_NUMBER:
            if(state.overwrite){
            return {
                ...state,
                overwrite:false,
                currentValue : null,
            }
        }
            if(state.currentValue == null) return state;
            if (state.currentValue.length === 1)
            return {
                ...state,
                currentValue : null} ;
            return{
                ...state,
                currentValue : state.currentValue.slice(0,-1)
            }

        case ACTIONS.EQUAL:
            if(state.currentValue == null || state.previousValue == null || state.operation == null) return  state;
            return {
                ...state,
                currentValue: evaluate(state),
                previousValue : null,
                operation:null,
                overwrite : true,
            }
    }
}


function evaluate({currentValue, previousValue, operation}){
    const preV = parseFloat(previousValue);
    const currV = parseFloat(currentValue);
    if(isNaN(preV) || isNaN(currV))
    return ""
    let calculations = '';

    switch(operation){
        case '÷':
            calculations = preV / currV;
            break;
        case '*':
            calculations = preV * currV;
            break;
        case '+':
            calculations = preV + currV ;
            break;
        case '-':
            calculations = preV - currV;
            break;
    }
    return calculations.toString()
}

const FORMATTER =  new Intl.NumberFormat('en-us', {maximumFractionDigits : 0})

const formate = (number) =>{
if(number == null) return;
const [integer, decimal] = number.split('.');
if(decimal == null ) return  FORMATTER.format(integer);
return `${FORMATTER.format(integer)}.${decimal}`
}

function Calculator() {

    const [{currentValue, previousValue, operation}, dispatch] = useReducer(reducer, {});

  return (
    <div className='container-grid'>
    <div className='output'>
    <div className='previous-digit'>{formate(previousValue)}{operation}</div>
        <div className='current-digit'> {formate(currentValue)}</div>
    </div>
        <button className='span' onClick={()=> dispatch({type : ACTIONS.CLEAR_ALL})}>AC</button>
        <button onClick={ ()=> dispatch({type : ACTIONS.DELETE_NUMBER})}> DEL</button>
        <OperationBtn dispatch = {dispatch} operation = '÷'/>
        <NumberButton dispatch= {dispatch} digit = '1'/>
        <NumberButton dispatch= {dispatch} digit = '2'/>
        <NumberButton dispatch= {dispatch} digit = '3'/>
        <OperationBtn dispatch = {dispatch} operation = '*'/>
        <NumberButton dispatch= {dispatch} digit = '4'/>
        <NumberButton dispatch= {dispatch} digit = '5'/>
        <NumberButton dispatch= {dispatch} digit = '6'/>
        <OperationBtn dispatch = {dispatch} operation = '+'/>
        <NumberButton dispatch= {dispatch} digit = '7'/>
        <NumberButton dispatch= {dispatch} digit = '8'/>
        <NumberButton dispatch= {dispatch} digit = '9'/>
        <OperationBtn dispatch = {dispatch} operation = '-'/>
        <NumberButton dispatch= {dispatch} digit = '.'/>
        <NumberButton dispatch= {dispatch} digit = '0'/>
        <button className='span'  onClick={()=> dispatch({type: ACTIONS.EQUAL})}>=</button>
    </div>
  )
}

export default Calculator