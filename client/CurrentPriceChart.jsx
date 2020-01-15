import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const CurrentPriceChart = (props) => {
  const [dataToChart, updateData] = useState(null);
  const [scales, updateScales] = useState(null);

  const colors = ['rgba(75,192,192,1)',"rgba(151,187,205,0.5)", 'black']
  
  useEffect(() => {
  if (props.multiData!== null && props.multiData!== undefined) {
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

    let customScales = {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: currencyLabels[0]
        },
        id: 'A',
        type: 'linear',
        position: 'left',
      }, {
        scaleLabel: {
          display: true,
          labelString: currencyLabels.length > 1 ? currencyLabels[1] : null
        },
        id: 'B',
        display: currencyLabels.length > 1 ? true : false,
        type: 'linear',
        position: 'right',
        ticks: {
          max: 1,
          min: 0
        }
      }]
    }
    console.log('finalData', finalData)
    updateScales(customScales)
    updateData(finalData);
  }
}, [props.multiData])
  

    const options= {
      scales: {
        gridLines: {
          color: 'transparent'
        },
        yAxes: [
        {
          id: 'A',
          type: 'linea',
          position: 'left',
          gridLines: {
            drawOnChartArea: false
        }
        }, 
        {
          id: 'B',
          type: 'logarithmic',
          position: 'right',
          gridLines: {
            drawOnChartArea: false
        }
        }
      ]
      }
    };


  return (
    <div>
      { dataToChart ?
        <Bar
          data={dataToChart}
          options={{
            title:{
              display:true,
              text:'Current Price',
              fontSize:20,
            }
            ,
            scales: scales
            
          }}
        />
        : null
      }
    </div>
  )
}

export default CurrentPriceChart;