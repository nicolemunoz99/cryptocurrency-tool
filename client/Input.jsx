import React, { useState, useEffect } from 'react';

const Input = (props) => {
  const [startDate, updateStart] = useState('');
  const [endDate, updateEnd] = useState('');

  const handleInput = (e) => { // TO DO: box highlight if input value invalid
    if (e.target.id === 'start') { updateStart(e.target.value) }
    if (e.target.id === 'end') { updateEnd(e.target.value) }
  }

  const submit = (e) => {
    props.handleSubmit({startDate, endDate});
  }

  return (
    <div className="col-10">
      <div className="h4">Get data for a time period</div>
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
        <div className="form-group mt-5 row justify-content-center">
          <div className="col-sm-3">Index: </div>
          <div className="col-sm-9">
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" id="ad" name="customRadioInline1" className="custom-control-input"></input>
              <label className="custom-control-label" for="ad">BPI</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" id="bce" name="customRadioInline1" className="custom-control-input disabled"></input>
              <label className="custom-control-label" for="bce">Other Index</label>
            </div>
          </div>
        </div>
        <div className="row justify-content-center m-4">
        {/* <div className="col-12"> */}
          <button onClick={submit} type="button" className="event-search btn btn-dark">Submit</button>
          {/* </div> */}
        </div>
      </form>

    </div>
  )
}

export default Input;