import React from 'react'
import "./Modal.css"
import { useState } from 'react'

const Modal = ({closeModal,onSubmit,defaultValue}) => {
  const[formState,setFormState] =  useState(
    defaultValue || {
    page:'',
    description:'',
    status:'Live',
  });

  const [error,setError] = useState("");

  const validateForm = ()=>{
    if(formState.page && formState.description && formState.status){
      setError("");
      return true;
    }else{  
      let  errorFields = [];
      for (const [key,value] of Object.entries(formState)) { //49m
        if(!value){
          errorFields.push(key);
        }
      }
      setError(errorFields.join(", "))
      return false;
    }
  }

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormState({
      ...formState,
      // [e.target.name]:e.target.value,
      [name]: value,
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!validateForm()) return;
    // console.log(formState);
    onSubmit(formState);
    closeModal();
  }

  return (
    <div className='modal-container' onClick={(e)=>{
      if(e.target.className === 'modal-container'){
        closeModal()
      }
    }}>
      <div className="modal">
        <form >
          <div className='form-group'>
            <label htmlFor="page">Page</label>
            <input type="text"  name="page" value={formState.page} onChange={handleChange}/>
          </div>
          <div className='form-group'>
            <label htmlFor="description">description</label>
            <textarea type="text" name="description" value={formState.description} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor="status">Status</label>
            <select name="status" value={formState.status} onChange={handleChange}>
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </div>
          { error && <div className='error' >{`Please include: ${error}`}</div>}
          <button type='submit' className='btn' onClick={handleSubmit}  >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Modal




