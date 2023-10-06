import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { GetTaskPerUser } from '../services/Taskservice';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);


function TaskPerUserChart() {
  const [chartData, setChartData] = useState()
  const [data, setData] = useState()
  const { projectId } = useParams()
  const options = {
    indexAxis: 'y',
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false
      },
      maintainAspectRatio: false,
    },
    scales: {
      y: {
        display: true,
        steps: 1,
        beginAtZero: true,
      }
    }
  };
  const getData = async () => {
    const { data: res } = await GetTaskPerUser(projectId)
    setChartData(res)
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(()=> {
    if(chartData){
      setData({
        labels: Object.keys(chartData),
        datasets: [
          {
            label: 'Dataset 1',
            data: Object.values(chartData),
            backgroundColor: '#171F39CE',
          }
        ],
    })
    };
  }, [chartData])
  
  return (
    <Card sx={{width: '100%', mt: 2}}>
      <Typography sx={{fontWeight: 600, m:2}} variant="h6" color="primary">
        Tasks per user
      </Typography>
      <CardContent sx={{width: '100%'}}>
        {
          (chartData && data) && <Bar style={{margin: 'auto', width: '100%'}} options={options} data={data} />
        }
      </CardContent>
    </Card>
  )
}

export default TaskPerUserChart