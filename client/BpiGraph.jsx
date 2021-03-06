import React, { Component, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const BpiGraph = (props) => {
  const [labels, updateLabels] = useState(props.bpiData.time)
  const [data, updateData] = useState([])

  useEffect(() => {
    updateData(props.bpiData);
    updateLabels(props.bpiData.time);
    console.log(data)
  }, [props.bpiData]);



  let datasets = [{
    label: 'BPI',
    // backgroundColor: 'rgba(75,192,192,1)',
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2,
    pointRadius: 0,
    data: data.y
  }]

  let graphData = {
    labels: labels,
    datasets: datasets

  }

  return (
    <div>
      {data ?
        <Line
          data={graphData}
          options={{
            title: {
              display: true,
              text: 'BPI (USD)',
              fontSize: 20,

            }
            ,
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              xAxes: [{
                ticks: {
                  maxTicksLimit: 12
                }
              }]
            }

          }}
        />
        : null
      }
      <div className="mt-3">
        <p>
          <small>
          Data provided by<a href="https://www.coindesk.com/price/bitcoin" className="credit-link"> CoinDesk</a>
          </small>
        </p>
      </div>
    </div>
  )

}

export default BpiGraph