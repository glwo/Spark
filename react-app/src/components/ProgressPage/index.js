import React, { Profiler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgress,
  alterProgress,
  delProgress,
} from "../../store/progress";
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
import UpdateProgress from "./UpdateProgressForm";
import DeleteProgress from "./DeleteProgress";

const ProgressGraph = () => {
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [selectedVariable, setSelectedVariable] = useState("weight");
  const [isAddProgressModalOpen, setIsAddProgressModalOpen] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [isViewProgressModalOpen, setIsViewProgressModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // 'view', 'update', or 'delete'
  const [isDeleteProgressDialogOpen, setIsDeleteProgressDialogOpen] =
    useState(false);
  const [progressToDelete, setProgressToDelete] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false); // Add this state

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
    labels: progressData.map(
      (entry) => moment.utc(entry.progress_date).toISOString().split(".")[0]
    ), // Remove milliseconds
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

  const handleUpdateProgress = () => {
    // Set the modal to "update" mode
    setModalMode("update");
  };

  const handleModalClose = () => {
    // Reset the modal mode and close the modal
    setModalMode("view");
    setIsViewProgressModalOpen(false);
  };

  const handleOpenDeleteProgressDialog = (progressEntry) => {
    setProgressToDelete(progressEntry);
    setIsDeleteConfirmationOpen(true); // Open the delete confirmation modal
  };

  // Function to close the delete progress dialog
  const handleCloseDeleteProgressDialog = () => {
    setIsDeleteConfirmationOpen(false); // Close the delete confirmation modal
    setProgressToDelete(null);
  };

  const handleDeleteProgress = () => {
    // Close the delete confirmation modal
    setIsDeleteConfirmationOpen(false);

    if (selectedProgress) {
      dispatch(delProgress(selectedProgress.id)); // Dispatch the delete action with the progress ID
      dispatch(fetchProgress()); // Refresh progress data
      setIsViewProgressModalOpen(false); // Close the modal after deletion
    }
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
                const clickedIndex = elems[0]._index;
                const clickedTimestamp = chartData.labels[clickedIndex];
                const selectedEntry = progressData.filter((entry) =>
                  moment(entry.progress_date).isSame(
                    moment(clickedTimestamp),
                    "day"
                  )
                );

                handleOpenViewProgressModal(selectedEntry[0]);
              }
            }}
          />
          <Dialog open={isViewProgressModalOpen} onClose={handleModalClose}>
            <DialogTitle>
              {modalMode === "view" && "Progress Details"}
              {modalMode === "update" && "Update Progress"}
              {modalMode === "delete" && "Delete Progress"}
            </DialogTitle>
            <DialogContent>
              {modalMode === "view" && selectedProgress ? (
                <div>
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
                  <div>
                    <Button onClick={handleUpdateProgress}>
                      Update Progress
                    </Button>
                    {/* Add a button to open the delete progress dialog */}
                    <Button
                      onClick={() =>
                        handleOpenDeleteProgressDialog(selectedProgress)
                      }
                    >
                      Delete Progress
                    </Button>
                  </div>
                </div>
              ) : modalMode === "update" ? (
                <UpdateProgress
                  onClose={handleModalClose}
                  progress={selectedProgress}
                />
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
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={handleCloseDeleteProgressDialog}
      >
        <DialogTitle>Delete Progress</DialogTitle>
        <DialogContent
          style={{
            width: "325px",
            minHeight: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography>
            Are you sure you want to delete this progress entry?
          </Typography>
          <div style={{ marginTop: "auto" }}>
            <Button onClick={handleDeleteProgress}>
              Confirm
            </Button>
            <Button onClick={handleCloseDeleteProgressDialog} color="secondary">Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProgressGraph;
