import React, { useState, useEffect } from 'react';
import BpiGraph from './BpiGraph.jsx';
import Input from './Input.jsx';

const App = (props) => {
  const [firstLoad, updateFirstLoad] = useState(true);
  const [bpiData, updateBpiData] = useState(bpiData);
  const [searchParams, updateSearch] = useState({startDate: '2019-09-01', endDate: '2019-09-20'})

  useEffect(() => {
    if (!firstLoad) {
      getData(searchParams.startDate, searchParams.endDate);
    }
  }, [searchParams, firstLoad])

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

  return (
    <div className="mt-4 mb-4">
      <div className="container-fluid">

        <div className="row mb-4">
          <div className="col-12 title-container">
            <div className="title">BitCoin Price Index</div>
          </div>
        </div>

        <div className="row justify-content-md-center mt-4">
          <Input handleSubmit={handleSubmit}/>
        </div>

        <div className="row justify-content-md-center mt-4">
          <div className="col-10">
            {bpiData ?
              <BpiGraph bpiData={bpiData} /> : null
            }
          </div>
        </div>

      </div>
    </div>
  )
}



export default App;

