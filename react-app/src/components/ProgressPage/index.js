import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgress } from '../../store/progress';

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

  const graphWidth = 600;
  const graphHeight = 400;

  // Extract progress dates and weights
  const dates = progressData.map((entry) => new Date(entry.progress_date));
  const weights = progressData.map((entry) => entry.weight);

  // Determine the range of dates and weights
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const minValue = Math.min(...weights);
  const maxValue = Math.max(...weights);

  // Calculate scales for positioning data points
  const xScale = graphWidth / (maxDate - minDate);
  const yScale = graphHeight / (maxValue - minValue);

  return (
    <div>
      <h2>Progress Graph</h2>
      <svg width={graphWidth} height={graphHeight}>
        {dates.map((date, index) => {
          const x = (date - minDate) * xScale;
          const y = graphHeight - (weights[index] - minValue) * yScale;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={4}
              fill="#8884d8"
              stroke="#8884d8"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ProgressGraph;
