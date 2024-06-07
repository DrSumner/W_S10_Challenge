import React, {useReducer} from 'react'
import { useCreateOrderMutation } from '../state/store'

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  customer: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const {name, value} = action.payload
      return {...state, [name]: value}
    }
    case RESET_FORM:
      return {
        customer: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,

      }
      default:
        return state
  }
}

export default function PizzaForm() {

  const [createOrder, {
    isLoading: creatingOrder,
    error: creationError
  }] = useCreateOrderMutation()
 

  const [state, dispatch] = useReducer(reducer, initialFormState)
  const onChange = ({ target: {name, value, type, checked}}) =>{
    if(type == 'checkbox') value = checked
    dispatch({ type: CHANGE_INPUT, payload: {name, value}})
  }

  const resetForm = () => dispatch({type: RESET_FORM})

  const  onSubmit = evt => {
    evt.preventDefault()

    let toppingss = [state['1'],state['2'],state['3'],state['4'],state['5']]
    

    let payload = { customer: state.customer, size: state.size, toppings: []}

    payload.size = payload.size == 'Small' ? 'S' 
    : payload.size == 'Medium' ? 'M' 
    : payload.size == 'Large' ? 'L' : payload.size

    toppingss.map( (topping, idx) => {if (topping == true){
        payload.toppings.push(idx+1)}
    } )

    createOrder(payload)
    console.log(payload.toppings)
    
    resetForm()


  }

  return (
    <form onSubmit={onSubmit} >
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: {creationError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="customer"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={state.customer}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size"
           onChange={onChange} value={state.size} >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onChange} checked={state['1']}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onChange} checked={state['2']} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onChange} checked={state['3']} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onChange} checked={state['4']} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onChange} checked={state['5']} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
