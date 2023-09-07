import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProgress, fetchProgress } from '../../store/progress';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import moment from 'moment';
import './ProgressForm.css'

const UpdateProgress = ({ onClose, progress }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [progress_date, setProgressDate] = useState(progress.progress_date);
  const [weight, setWeight] = useState(progress.weight);
  const [body_fat_percentage, setBodyFat] = useState(progress.body_fat_percentage);
  const [height, setHeight] = useState(progress.height);
  const [age, setAge] = useState(progress.age);
  const [metabolic_age, setMetabolicAge] = useState(progress.metabolic_age);
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector(state => state.session.user);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const progressData = {
        ...progress,
        id: progress.id,
      progress_date,
      weight,
      body_fat_percentage,
      height,
      age,
      metabolic_age,
    };

    // console.log(progress)

    const data = await dispatch(updateProgress(progressData));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setProgressDate('');
      setWeight('');
      setBodyFat('');
      setHeight('');
      setAge('');
      setMetabolicAge('');
      setErrors([]);
      onClose();

      dispatch(fetchProgress());
    }
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

export default UpdateProgress;
