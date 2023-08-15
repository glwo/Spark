import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgress, createProgress } from '../../store/progress'; // Assuming you have an action to add new progress data
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Button, TextField, Typography } from '@mui/material';
import { Container, Paper } from '@mui/material';
import "./ProgressPage.css";

const ProgressGraph = () => {
  const user = useSelector((state) => state.session.user);
  const allProgressData = useSelector((state) => state.progress.progressList.progress_entries);
  const dispatch = useDispatch();
  const [selectedVariable, setSelectedVariable] = useState('weight');
  const [newProgressData, setNewProgressData] = useState({
    weight: 0,
    body_fat_percentage: 0,
    metabolic_age: 0,
  });

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  if (!allProgressData) {
    return null;
  }

  const progressData = Object.values(allProgressData).filter(
    (progress) => progress.user_id === user.id
  );

  const getVariableLabel = (variable) => {
    switch (variable) {
      case 'weight':
        return 'Weight (lbs)';
      case 'body_fat_percentage':
        return 'Body Fat (%)';
      case 'metabolic_age':
        return 'Metabolic Age (years)';
      default:
        return '';
    }
  };

  const chartData = {
    labels: progressData.map((entry) => moment(entry.progress_date).toDate()),
    datasets: [
      {
        label: getVariableLabel(selectedVariable),
        data: progressData.map((entry) => entry[selectedVariable]),
        fill: false,
        borderColor: '#efaf00',
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
            day: 'MMM D',
          },
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
  };

  const handleVariableChange = (variable) => {
    setSelectedVariable(variable);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProgressData({ ...newProgressData, [name]: value });
  };

  const handleAddProgressData = () => {
    dispatch(createProgress(newProgressData));
    setNewProgressData({ weight: 0, body_fat_percentage: 0, metabolic_age: 0 });
  };

  return (
    <Container className="graph-container">
      <Typography variant="h4">Your Progress</Typography>
      <div className="variable-selector">
        <Button
          variant={selectedVariable === 'weight' ? 'contained' : 'outlined'}
          onClick={() => handleVariableChange('weight')}
        >
          {getVariableLabel('weight')}
        </Button>
        <Button
          variant={selectedVariable === 'body_fat_percentage' ? 'contained' : 'outlined'}
          onClick={() => handleVariableChange('body_fat_percentage')}
        >
          {getVariableLabel('body_fat_percentage')}
        </Button>
        <Button
          variant={selectedVariable === 'metabolic_age' ? 'contained' : 'outlined'}
          onClick={() => handleVariableChange('metabolic_age')}
        >
          {getVariableLabel('metabolic_age')}
        </Button>
      </div>
      {progressData.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <Typography>No progress data available.</Typography>
      )}

      {/* Form for adding new progress data */}
      <Paper elevation={3} className="add-progress-form">
        <Typography variant="h5">Add New Progress Data</Typography>
        <TextField
          type="number"
          name="weight"
          value={newProgressData.weight}
          onChange={handleInputChange}
          label="Weight"
        />
        <TextField
          type="number"
          name="body_fat_percentage"
          value={newProgressData.body_fat_percentage}
          onChange={handleInputChange}
          label="Body Fat Percentage"
        />
        <TextField
          type="number"
          name="metabolic_age"
          value={newProgressData.metabolic_age}
          onChange={handleInputChange}
          label="Metabolic Age"
        />
        <Button onClick={handleAddProgressData} variant="contained" color="primary">
          Add Data
        </Button>
      </Paper>
    </Container>
  );
};

export default ProgressGraph;
