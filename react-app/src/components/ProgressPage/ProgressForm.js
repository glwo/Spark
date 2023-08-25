import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProgress } from '../../store/progress';
import { useHistory } from 'react-router-dom';
import './ProgressForm.css'

export default function CreateProgress({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [progress_date, setProgressDate] = useState('');
  const [weight, setWeight] = useState('');
  const [body_fat_percentage, setBodyFat] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [metabolic_age, setMetabolicAge] = useState();
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector(state => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (currentUser == undefined) return history.push('/login')

    const progress = {
      progress_date,
      weight,
      body_fat_percentage,
      height,
      age,
      metabolic_age
    };

    const data = await dispatch(createProgress(progress))
    if (data.errors) {
      setErrors(data.errors)
    } else {
      setErrors([]);
      onClose();
    }
  }

  return (
    <div className='main-div'>
      <div className='create-progress-form'>
        <h1>
          Add Progress
        </h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="input-form">
            <label>Date:</label>
            <input
              type='date'
              value={progress_date}
              onChange={(e) => setProgressDate(e.target.value)}
              required
            />
          </div>
          <div className="input-form">
            <label>Weight:</label>
            <input
              type='number'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div className="input-form">
            <label>Body Fat Percentage:</label>
            <input
              type='text'
              value={body_fat_percentage}
              onChange={(e) => setBodyFat(e.target.value)}
              required
            />
          </div>
          <div className="input-form">
            <label>Height:</label>
            <input
              type='text'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div className="input-form">
            <label>Age:</label>
            <input
              type='number'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="input-form">
            <label>Metabolic Age:</label>
            <input
              type='number'
              value={metabolic_age}
              onChange={(e) => setMetabolicAge(e.target.value)}
              required
            />
          </div>
          <div>
            <button className='create-button' type="submit">Create New Business</button>
          </div>
        </form>
      </div>
    </div>
  )
}
