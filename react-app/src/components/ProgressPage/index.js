import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgress, alterProgress } from "../../store/progress";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CreateProgress from "./ProgressForm";
import "./ProgressPage.css";

const ProgressGraph = () => {
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [selectedVariable, setSelectedVariable] = useState("weight");
  const [isAddProgressModalOpen, setIsAddProgressModalOpen] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [isViewProgressModalOpen, setIsViewProgressModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  const progressData =
    useSelector((state) =>
      Object.values(state.progress.progressList.progress_entries || []).filter(
        (progress) => progress.user_id === user.id
      )
    ) || [];

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

  const handleOpenAddProgressModal = () => {
    setIsAddProgressModalOpen(true);
  };

  const handleCloseAddProgressModal = () => {
    setIsAddProgressModalOpen(false);
  };

  const handleOpenViewProgressModal = (selectedEntry) => {
    setSelectedProgress(selectedEntry);
    setIsViewProgressModalOpen(true);
  };

  const handleCloseViewProgressModal = () => {
    setIsViewProgressModalOpen(false);
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
        <div>
          <Line
            data={chartData}
            options={chartOptions}
            onElementsClick={(elems) => {
              if (elems.length > 0) {
                const clickedIndex = elems[0].index;
                const clickedTimestamp = chartData.labels[clickedIndex];
                console.log(clickedTimestamp);

                // Find the data point with the exact same timestamp as the clicked timestamp
                const selectedEntry = progressData.find((entry) =>
                  moment(entry.progress_date).isSame(
                    moment(clickedTimestamp),
                    "day"
                  )
                );

                console.log("Selected Entry:", selectedEntry); // Debugging
                handleOpenViewProgressModal(selectedEntry);
              }
            }}
          />
          <Dialog
            open={isViewProgressModalOpen}
            onClose={handleCloseViewProgressModal}
          >
            <DialogTitle>Progress Details</DialogTitle>
            <DialogContent>
              {selectedProgress ? (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>
                        {moment(selectedProgress.progress_date).format("ll")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {getVariableLabel(selectedVariable)}
                      </TableCell>
                      <TableCell>
                        {selectedProgress[selectedVariable]}
                      </TableCell>
                    </TableRow>
                    {/* Add more rows for additional progress data */}
                  </TableBody>
                </Table>
              ) : (
                <Typography>No progress data available.</Typography>
              )}
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Typography>No progress data available.</Typography>
      )}
      <Button onClick={handleOpenAddProgressModal}>Add Progress</Button>
      <Dialog
        open={isAddProgressModalOpen}
        onClose={handleCloseAddProgressModal}
      >
        <DialogTitle>Add New Progress Data</DialogTitle>
        <DialogContent>
          <CreateProgress onClose={handleCloseAddProgressModal} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProgressGraph;
