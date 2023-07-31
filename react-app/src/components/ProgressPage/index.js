import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgress, createProgress} from '../../store/progress'; // Assuming you have an action to add new progress data
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js';
import moment from 'moment';
import "./ProgressPage.css";

const ProgressGraph = () => {
  const user = useSelector((state) => state.session.user);
  const allProgressData = useSelector((state) => state.progress.progressList.progress_entries);
  const dispatch = useDispatch();
  const [selectedVariable, setSelectedVariable] = useState('weight'); // Default selected variable is 'weight'
  const [newProgressData, setNewProgressData] = useState({
    weight: 0,
    body_fat_percentage: 0,
    metabolic_age: 0,
  });

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
        label: getVariableLabel(selectedVariable), // Use the custom label for the selected variable
        data: progressData.map((entry) => entry[selectedVariable]), // Access the selected variable dynamically
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
    <div className="graph-container">
      <h2>Your Progress</h2>
      <div className="variable-selector">
        <button
          className={selectedVariable === 'weight' ? 'active' : ''}
          onClick={() => handleVariableChange('weight')}
        >
          {getVariableLabel('weight')}
        </button>
        <button
          className={selectedVariable === 'body_fat_percentage' ? 'active' : ''}
          onClick={() => handleVariableChange('body_fat_percentage')}
        >
          {getVariableLabel('body_fat_percentage')}
        </button>
        <button
          className={selectedVariable === 'metabolic_age' ? 'active' : ''}
          onClick={() => handleVariableChange('metabolic_age')}
        >
          {getVariableLabel('metabolic_age')}
        </button>
      </div>
      {progressData.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>No progress data available.</p>
      )}

      {/* Form for adding new progress data */}
      <div className="add-progress-form">
        <h3>Add New Progress Data</h3>
        <input
          type="number"
          name="weight"
          value={newProgressData.weight}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="body_fat_percentage"
          value={newProgressData.body_fat_percentage}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="metabolic_age"
          value={newProgressData.metabolic_age}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProgressData}>Add Data</button>
      </div>
    </div>
  );
};

export default ProgressGraph;
