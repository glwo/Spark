import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgress } from '../../store/progress';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js';
import moment from 'moment';


const ProgressGraph = () => {
  const user = useSelector((state) => state.session.user);
  const allProgressData = useSelector((state) => state.progress.progressList.progress_entries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  if (!allProgressData) {
    return null; // Return early if progress data is not yet available
  }

  const progressData = Object.values(allProgressData).filter(
    (progress) => progress.user_id === user.id
  );

  if (!progressData.length) {
    return <p>No progress data available.</p>; // Display a message if no progress data is found for the user
  }

  const chartData = {
    labels: progressData.map((entry) => moment(entry.progress_date).toDate()),
    datasets: [
      {
        label: 'Weight',
        data: progressData.map((entry) => entry.weight),
        fill: false,
        borderColor: '#8884d8',
      },
      {
        label: 'Body Fat Percentage',
        data: progressData.map((entry) => entry.body_fat_percentage),
        fill: false,
        borderColor: '#82ca9d',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'll',
          displayFormats: {
            day: 'MMM D', // Use the desired format for displaying the date
          },
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
  };


  return (
    <div>
      <h2>Progress Graph</h2>
      {progressData.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>No progress data available.</p>
      )}
    </div>
  );
};

export default ProgressGraph;
