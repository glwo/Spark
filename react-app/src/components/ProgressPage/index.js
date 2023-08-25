import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgress, createProgress } from "../../store/progress"; // Assuming you have an action to add new progress data
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import CreateProgress from "./ProgressForm";
import "./ProgressPage.css";

const ProgressGraph = () => {
  const user = useSelector((state) => state.session.user);
  const allProgressData = useSelector(
    (state) => state.progress.progressList.progress_entries
  );
  const dispatch = useDispatch();
  const [selectedVariable, setSelectedVariable] = useState("weight");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case "weight":
        return "Weight (lbs)";
      case "body_fat_percentage":
        return "Body Fat (%)";
      case "metabolic_age":
        return "Metabolic Age (years)";
      default:
        return "";
    }
  };

  const chartData = {
    labels: progressData.map((entry) => moment(entry.progress_date).toDate()),
    datasets: [
      {
        label: getVariableLabel(selectedVariable),
        data: progressData.map((entry) => entry[selectedVariable]),
        fill: false,
        borderColor: "#efaf00",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "ll",
          displayFormats: {
            day: "MMM D",
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container className="graph-container">
      <Typography variant="h4">Your Progress</Typography>
      <div className="variable-selector">
        <Button
          variant={selectedVariable === "weight" ? "contained" : "outlined"}
          onClick={() => handleVariableChange("weight")}
        >
          {getVariableLabel("weight")}
        </Button>
        <Button
          variant={
            selectedVariable === "body_fat_percentage"
              ? "contained"
              : "outlined"
          }
          onClick={() => handleVariableChange("body_fat_percentage")}
        >
          {getVariableLabel("body_fat_percentage")}
        </Button>
        <Button
          variant={
            selectedVariable === "metabolic_age" ? "contained" : "outlined"
          }
          onClick={() => handleVariableChange("metabolic_age")}
        >
          {getVariableLabel("metabolic_age")}
        </Button>
      </div>
      {progressData.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <Typography>No progress data available.</Typography>
      )}

      <Button onClick={handleOpenModal}>Add Progress</Button>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Add New Progress Data</DialogTitle>
        <DialogContent>
          <CreateProgress onClose={handleCloseModal} />{" "}
          {/* Pass onClose prop */}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProgressGraph;
