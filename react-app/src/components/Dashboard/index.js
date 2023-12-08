import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line, Pie } from 'react-chartjs-2'; // Import Line and Pie components from "react-chartjs-2"

function Dashboard(props) {
//   const users = useSelector((state) => state.config.users);
  const [totalSubs, setTotalSubs] = useState();
  const [goldSubs, setGoldSubs] = useState();
  const [premiumSubs, setPremiumSubs] = useState();
  const [standardSubs, setStandardSubs] = useState();
  const [inactiveSubs, setInactiveSubs] = useState();

  useEffect(() => {
  }, []);

  const renderLineChart = () => {
    const uData = [1, 5, 10, 25, 100];
    const xLabels = ['Jan', 'Apr', 'Jul', 'Oct', 'Dec'];

    const lineChartData = {
      labels: xLabels,
      datasets: [
        {
          label: 'Line Chart Data',
          data: uData,
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    return (
      <div
        style={{
          width: '100%',
          height: '90%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          boxSizing: 'border-box',
        }}
      >
        <Line data={lineChartData} /> {/* Use Line component from "react-chartjs-2" */}
      </div>
    );
  };

  const renderPieChart = () => {
    let data = [
      { id: 0, value: goldSubs, label: 'gold', color: '#EAC44E' },
      { id: 1, value: premiumSubs, label: 'premium', color: '#814CDE' },
      { id: 2, value: standardSubs, label: 'standard', color: '#0A6ADD' },
      { id: 2, value: inactiveSubs, label: 'inactive', color: '#5A5A72' },
    ];

    const pieChartData = {
      labels: data.map((item) => item.label),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((item) => item.color),
        },
      ],
    };

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          marginTop: '40px',
        }}
      >
        <Pie data={pieChartData} /> {/* Use Pie component from "react-chartjs-2" */}
      </div>
    );
  };

    return (
      <div className='Page-container'>
        <h1>Dashboard</h1>
        <div className="Dashboard-container">
          <div
            className='Dashboard-card'
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
          >
            <h3 style={{ position: 'absolute', left: '32px', top: '8px' }}>Performance</h3>
            <div className='Dashboard-card-content'>
              <h1 style={{ margin: '0' }}>{}</h1>
              <p style={{ margin: '0' }}>users</p>
            </div>
            <div className='Dashboard-card-content'>
              <h1 style={{ margin: '0' }}>{totalSubs}</h1>
              <p style={{ margin: '0' }}>active subscriptions</p>
            </div>
            <div className='Dashboard-card-content'>
              <h1 style={{ margin: '0' }}>$500k</h1>
              <p style={{ margin: '0' }}>in revenue</p>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', gap: '32px', justifyContent: 'space-between' }}>
            <div className='Dashboard-card'>
              <h3 style={{ position: 'absolute', left: '32px', top: '8px' }}>Breakdown</h3>
              <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderPieChart()}
              </div>
            </div>
            <div className='Dashboard-card'>
              <h3 style={{ position: 'absolute', left: '32px', top: '8px' }}>Projections</h3>
              <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderLineChart()}
              </div>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', gap: '32px', justifyContent: 'space-between' }}>
            <div className='Dashboard-card'>
              {/* <Chip
                style={{ position: 'absolute', top: '16px', left: '16px' }}
                className='Dashboard-chip'
                color='warning'
                variant="solid"
              >
                Gold
              </Chip> */}
              <div className='Dashboard-card-content'>
                <h1 style={{ margin: '0' }}>{goldSubs}</h1>
                <p style={{ margin: '0' }}>subscriptions</p>
              </div>
            </div>
            <div className='Dashboard-card'>
              {/* <Chip
                style={{ position: 'absolute', top: '16px', left: '16px' }}
                color='info'
                variant="solid"
              >
                Premium
              </Chip> */}
              <div className='Dashboard-card-content'>
                <h1 style={{ margin: '0' }}>{premiumSubs}</h1>
                <p style={{ margin: '0' }}>subscriptions</p>
              </div>
            </div>
            <div className='Dashboard-card'>
              {/* <Chip
                style={{ position: 'absolute', top: '16px', left: '16px' }}
                color='primary'
                variant="solid"
              >
                Standard
              </Chip> */}
              <div className='Dashboard-card-content'>
                <h1 style={{ margin: '0' }}>{standardSubs}</h1>
                <p style={{ margin: '0' }}>subscriptions</p>
              </div>
            </div>
            <div className='Dashboard-card'>
              {/* <Chip
                style={{ position: 'absolute', top: '16px', left: '16px' }}
                color='neutral'
                variant="solid"
              >
                Inactive
              </Chip> */}
              <div className='Dashboard-card-content'>
                <h1 style={{ margin: '0' }}>{inactiveSubs}</h1>
                <p style={{ margin: '0' }}>subscriptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Dashboard
