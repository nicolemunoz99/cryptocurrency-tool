import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const CurrentPriceChart = (props) => {
  const [dataToChart, updateData] = useState(null);

  const colors = ['rgba(75,192,192,1)',"rgba(151,187,205,0.5)", 'black']
  
  useEffect(() => {
  if (props.multiData!== null && props.multiData!== undefined) {
    console.log('data in CP-chart', Object.keys(props.multiData.formattedData));
    let currencyLabels = Object.keys(props.multiData.formattedData);
    let datasets =[];
    currencyLabels.forEach ((currency, i) => {
      let set =         {
        label: currency,
        backgroundColor: colors[i],
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: props.multiData.formattedData[currency]
      }
      datasets.push(set);
    });
    
    let finalData = {
      labels: props.multiData.symbolLabels,
      datasets: datasets
    };
    updateData(finalData);
  }
}, [props.multiData])
  


    var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "USD",
          backgroundColor: 'rgba(75,192,192,1)',
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "JPY",
          backgroundColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };



  return (
    <div>
      { dataToChart ?
        <Bar
          // width={500}
          // height={300}
          // offset={20}
          data={dataToChart}
        />
        : null
      }
    </div>
  )
}

export default CurrentPriceChart;