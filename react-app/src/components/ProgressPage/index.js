import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProgress } from '../../store/progress';

const ProgressGraph = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  const renderLineGraph = () => {
    if (progressData.length === 0) {
      return <p>No progress data available.</p>;
    }

    const graphWidth = 600;
    const graphHeight = 400;
    const maxValue = Math.max(...progressData.map((entry) => entry.weight));
    const dataPoints = progressData.map((entry) => entry.weight);

    const xScale = graphWidth / (dataPoints.length - 1);
    const yScale = graphHeight / maxValue;

    const path = dataPoints
      .map((value, index) => `${index * xScale},${graphHeight - value * yScale}`)
      .join(' ');

    return (
      <svg width={graphWidth} height={graphHeight}>
        <polyline
          points={path}
          fill="none"
          stroke="#8884d8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div>
      <h2>Progress Graph</h2>
      {renderLineGraph()}
    </div>
  );
};

export default ProgressGraph;
