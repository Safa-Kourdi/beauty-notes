import * as React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";

//components
import { myContext } from "../context/myContext";

export default function Todo({ task }) {
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const { Tasks, setTasks } = useContext(myContext);
  const [EditTask, setEditTask] = useState({
    title: task.title,
    details: task.details,
  });
  function handleCheckClick() {
    const updatedTodos = Tasks.map((t) => {
      if (t.id === task.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTasks(updatedTodos);
    localStorage.setItem("Tasks", JSON.stringify(updatedTodos));
  }
  function handleDeleteClick() {
    setOpen(true);
  }
  function handleDeleteDialogClose() {
    setOpen(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = Tasks.filter((t) => {
      return t.id !== task.id;
    });
    setTasks(updatedTodos);
    localStorage.setItem("Tasks", JSON.stringify(updatedTodos));
  }
  function handleEditClick() {
    setOpenE(true);
  }
  function handleEditDialogClose() {
    setOpenE(false);
  }
  function handleEditConfirm() {
    const EditT = Tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, title: EditTask.title, details: EditTask.details };
      } else {
        return t;
      }
    });
    setTasks(EditT);
    setOpenE(false);
    localStorage.setItem("Tasks", JSON.stringify(EditT));
  }
  return (
    <>
      <Dialog
        onClose={handleDeleteDialogClose}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ background: "#eab1c4ff", fontWeight: "bold" }}
          id="alert-dialog-title"
        >
          {"Delete Task"}
        </DialogTitle>
        <DialogContent style={{ background: "#eab1c4ff" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "black" }}
          >
            It cannont be restored after deletion.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: "#eab1c4ff" }}>
          <Button
            onClick={handleDeleteDialogClose}
            style={{ color: "black", fontWeight: "bold" }}
          >
            Disagree
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            autoFocus
            style={{ color: "black", fontWeight: "bold" }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={handleEditDialogClose}
        open={openE}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ background: "#eab1c4ff", fontWeight: "bold" }}
          id="alert-dialog-title"
        >
          {"Edit Task"}
        </DialogTitle>
        <DialogContent style={{ background: "#eab1c4ff" }}>
          <TextField
            value={EditTask.title}
            onChange={(e) =>
              setEditTask({ ...EditTask, title: e.target.value })
            }
            autoFocus
            margin="dense"
            id="name"
            name="text"
            label="Task Title"
            fullWidth
            variant="standard"
            sx={{
              "& .MuiInput-underline:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
          />
        </DialogContent>
        <DialogContent style={{ background: "#eab1c4ff" }}>
          <TextField
            value={EditTask.details}
            onChange={(e) => {
              setEditTask({ ...EditTask, details: e.target.value });
            }}
            margin="dense"
            id="name"
            name="text"
            label="Task Details"
            fullWidth
            variant="standard"
            sx={{
              "& .MuiInput-underline:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "black",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black",
              },
              "& .MuiInputLabel-root": {
                color: "black",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
          />
        </DialogContent>
        <DialogActions style={{ background: "#eab1c4ff" }}>
          <Button
            onClick={handleEditDialogClose}
            style={{ color: "black", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditConfirm}
            autoFocus
            style={{ color: "black", fontWeight: "bold" }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        className="card"
        sx={{ minWidth: 275 }}
        style={{ background: "pink", margin: "10px" }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{ textAlign: "left", fontWeight: "bold" ,textDecoration:task.isCompleted?"line-through":"none"}}
              >
                {task.title}
              </Typography>
              <p style={{ textAlign: "left" }}>{task.details}</p>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={handleCheckClick}
                className="button"
                style={{
                  color: task.isCompleted ? "white" : "#D81B60",
                  background: task.isCompleted ? "#D81B60" : "white",
                  // border: "solid #D81B60 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleEditClick}
                className="button"
                style={{
                  color: "#D81B60",
                  background: "white",
                  // border: "solid #D81B60 3px",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                className="button"
                style={{
                  color: "#D81B60",
                  background: "white",
                  // border: "solid #D81B60 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
