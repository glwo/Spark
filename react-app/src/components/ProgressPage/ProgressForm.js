import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProgress } from '../../store/progress';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import moment from 'moment';
import './ProgressForm.css'

const CreateProgress = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [progress_date, setProgressDate] = useState('');
  const [weight, setWeight] = useState('');
  const [body_fat_percentage, setBodyFat] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [metabolic_age, setMetabolicAge] = useState('');
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector(state => state.session.user);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const progress = {
      progress_date,
      weight,
      body_fat_percentage,
      height,
      age,
      metabolic_age,
    };

    console.log(progress)

    const data = await dispatch(createProgress(progress));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setErrors([]);
      onClose();
    }
    setErrors([]);
      onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Progress</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <TextField
            type="date"
            value={progress_date}
            onChange={(e) => setProgressDate(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Body Fat Percentage"
            type="text"
            value={body_fat_percentage}
            onChange={(e) => setBodyFat(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Height"
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Metabolic Age"
            type="number"
            value={metabolic_age}
            onChange={(e) => setMetabolicAge(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button className='create-button' type="submit">Create Progress</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProgress;
