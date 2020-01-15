import React, { useState, useEffect } from 'react';
import cryptoSecret from '../cryptoSecret.js'
import BpiGraph from './BpiGraph.jsx';
import BpiInput from './BpiInput.jsx';
import CurrentPriceInput from './CurrentPriceInput.jsx';
import CurrentPriceChart from './CurrentPriceChart.jsx';

const App = (props) => {
  const [firstLoad, updateFirstLoad] = useState(true);

  // BPI time series
  const [bpiData, updateBpiData] = useState(null);
  const [searchParams, updateSearch] = useState({ startDate: null, endDate: null })

  // multi-index/multi-currency bar chart
  const [multiData, updateMultiData] = useState(null);

  useEffect(() => {
    if (!firstLoad) {
      getData(searchParams.startDate, searchParams.endDate);
    }
  }, [searchParams, firstLoad])


  // BPI time series
  const getData = async (start, end) => {
    let response = await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`);
    let data = await response.json();
    let formatedData = { y: [], time: [] };
    for (let date in data.bpi) {
      formatedData.y.push(data.bpi[date]);
      formatedData.time.push(date)
    }
    updateBpiData(formatedData);
  }

  const handleSubmit = (params) => {
    updateFirstLoad(false);
    updateSearch(params);
  }

  // multi-index/multi-currency
  const getMultiData = async (symbols, currencies) => {
    updateFirstLoad(false);
    if (symbols.length > 0 && currencies.length > 0) {
      let queryString = '';
      if (symbols.length > 1) {
        queryString += `pricemulti?fsyms=${symbols.join(',')}`;
      } else {
        queryString += `price?fsym=${symbols[0]}`;
      }
      queryString += `&tsyms=${currencies.join(',')}`;
      let response = await fetch(`https://min-api.cryptocompare.com/data/${queryString}${cryptoSecret}`)
      let data = await response.json();

      let symbolLabels = Object.keys(data);
      let currencyLabels;
      let formattedData = {};
      if (symbols.length === 1) {
        currencyLabels = symbolLabels;
        symbolLabels = [symbols[0]];
        formattedData = data;
        for (let currency in formattedData) {
          formattedData[currency] = [formattedData[currency]]
        }
      } else {
        currencyLabels = Object.keys(data[symbolLabels[0]]);
        currencyLabels.forEach(label => formattedData[label] = []);
        for (let symbol of symbolLabels) {
          for (let currency of currencyLabels) {
            formattedData[currency].push(data[symbol][currency]);
          }
        }
      }
      let chartData = { formattedData, symbolLabels };
      updateMultiData(chartData);
    }
  }

  return (
    <div className="mt-4 mb-4">
      <div className="container-fluid">

        <div className="row mb-4">
          <div className="col-12 title-container">
            <div className="title">Cryptocurrency Tool</div>
          </div>
        </div>
        <div className="outline">
          <div className="row justify-content-md-center mt-4">
            <BpiInput handleSubmit={handleSubmit} />
          </div>

          <div className="row justify-content-md-center mt-4">
            <div className="col-10">
              {bpiData ?
                <BpiGraph bpiData={bpiData} /> : null
              }
            </div>
          </div>
        </div>
        <div className="outline">
          <div className="row justify-content-md-center mt-4">
            <CurrentPriceInput getMultiData={getMultiData} />
          </div>

          <div className="row justify-content-md-center mt-4">
            <div className="col-10">
              {multiData ?
                <CurrentPriceChart multiData={multiData} /> : null
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;

