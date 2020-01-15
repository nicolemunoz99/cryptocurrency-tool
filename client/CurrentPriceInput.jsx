import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const CurrentPriceInput = (props) => {
  const [count, updateCount] = useState(0)
  const [symbolOptions, updateSymOptions] = useState(['ETH', 'XRP', 'BSV']);
  const [selectedSymbols, updateSelectedSymbols] = useState([]);

  const [currencyOptions, updateCurrOptions] = useState(['USD', 'JPY', 'EUR']);
  const [selectedCurrencies, updateSelectedCurrencies] = useState([]);

  // useEffect(() => {
  //   props.getMultiData(selectedSymbols, selectedCurrencies)
  // })


  const submit = (e) => {
    props.getMultiData(selectedSymbols, selectedCurrencies)
  }

  const toggleSymbol = (e) => {
    let cryptoSymbol = e.target.value;
    let arrayIndex = selectedSymbols.indexOf(cryptoSymbol);
    
    let alreadySelected = arrayIndex === -1 ? false : true;
    let current = selectedSymbols;
    updateCount(count + 1);
    if (alreadySelected === true) { 
      current.splice(arrayIndex, 1);
      
      updateSelectedSymbols(current);
      
    } else {    
      current.push(cryptoSymbol);
      updateSelectedSymbols(current);
    }
  }

  const toggleCurrency = (e) => {
    let currency = e.target.value;
    let arrayIndex = selectedCurrencies.indexOf(currency);
    let alreadySelected = arrayIndex === -1 ? false : true;
    let current = selectedCurrencies;
    updateCount(count + 1);
    if (alreadySelected) {
      current.splice(arrayIndex, 1);
    } else {
      current.push(currency);
      updateSelectedCurrencies(current);
    }
  }

  return (
    <div className="col-10">
      <div className="h4">See current prices</div>
      <form>
        <div className="form-group mt-5 row justify-content-center">
          <div className="col-sm-3">Select indexes: </div>
          <div className="col-sm-9">
            {
              symbolOptions.map(symbol => {
                return (
                  <div key={symbol} className="form-check form-check-inline mr-3">
                    <input onClick={toggleSymbol} className="form-check-input" type="checkbox" id={symbol} value={symbol}></input>
                    <label className="form-check-label" for={symbol}>{symbol}</label>
                  </div>
                )
              })
            }

          </div>
          <div className="col-sm-3">Select currencies: </div>
          <div className="col-sm-9">
            {
              currencyOptions.map(option => {
                return (
                  <div key={option} className="form-check form-check-inline mr-3">
                    <input onClick={toggleCurrency} className="form-check-input" type="checkbox" id={option} value={option}></input>
                    <label className="form-check-label" for={option}>{option}</label>
                  </div>
                )
              })
            }

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

export default CurrentPriceInput;