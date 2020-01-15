import React, { useState, useEffect } from 'react';

const Input = (props) => {
  const [startDate, updateStart] = useState('');
  const [endDate, updateEnd] = useState('');

  let validFormat = /\d\d\d\d-\d\d-\d\d/

  const handleInput = (e) => { 
    if (e.target.id === 'start') { updateStart(e.target.value) }
    if (e.target.id === 'end') { updateEnd(e.target.value) }

    if (!e.target.value.match(validFormat)) {
      if (!e.target.classList.contains('is-invalid')) {
        e.target.classList.add('is-invalid')
      }
    }
    if (e.target.value.match(validFormat)) {
      if (e.target.classList.contains('is-invalid')) {
        e.target.classList.remove('is-invalid')
      }
    }

  }

  const submit = (e) => {
    if (endDate.match(validFormat) && startDate.match(validFormat)) {
      props.handleSubmit({startDate, endDate});
    }    
  }

  return (
    <div className="col-10">
      <div className="h4">Historical BitCoin price index (BPI)</div>
      <form>
        <div className="form-group mt-5 row justify-content-center no-gutters">
          <label className="col-form-label">Start date: </label>
          <div className="col-sm-3">
            <input onChange={handleInput} value={startDate ? startDate : ''} className="ml-2 form-control" id="start" placeholder="YYYY-MM-DD"></input>
          </div>
          <div className="col-sm-2"></div>
          <label className="col-form-label">End date: </label>
          <div className="col-sm-3">
            <input onChange={handleInput} value={endDate ? endDate : ''} className="ml-2 form-control" id="end" placeholder="YYYY-MM-DD"></input>
          </div>
        </div>

        <div className="row justify-content-center m-4">
        <div className="col-12">
          <button onClick={submit} type="button" className="event-search btn btn-dark">Submit</button>
        </div>
        </div>
      </form>

    </div>
  )
}

export default Input;