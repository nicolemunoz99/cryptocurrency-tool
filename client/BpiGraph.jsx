import React, {Component, useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';

const  BpiGraph = (props) => {
  const [labels, updateLabels] = useState(props.bpiData.time)
  const [data, updateData] = useState([])

  useEffect(() => {
    updateData(props.bpiData);
    updateLabels(props.bpiData.time);

  }, [props.bpiData]);



  let datasets = [{
    label: 'BPI',
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2,
    pointRadius: 0,
    data: data.y
    }]

  let graphData = {
    labels: labels,
    datasets: datasets

  }
  // console.log('props.bpiData', props.bpiData.y[0])
  
  return (
      <div>
        {data ? 
          <Line 
            data={graphData}
            options={{
              title:{
                display:true,
                text:'BPI (USD)',
                fontSize:20,
                
              }
              ,
              legend:{
                display:false,
                position:'right'
              },
              scales: {
                xAxes: [{
                  ticks: {
                    maxTicksLimit: 12
                    //  min: 0,
                    //  stepSize: 3
                   }
                 }]
                }
              
            }}
          /> 
          : null
        }
      </div>
  )
  
}

export default BpiGraph