import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";

//components
import Todo from "./Todo";
import { myContext } from "../context/myContext";

export default function TodoList() {
  function handleAddClick() {
    const newTask = {
      id: uuidv4(),
      title: titleInput,
      details: "No Details",
      isCompleted: false,
    };
    const updatedTodos = [...Tasks, newTask];
    setTasks(updatedTodos);
    localStorage.setItem("Tasks", JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  const { Tasks, setTasks } = useContext(myContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTasksType, setDisplayedTasksType] = useState("all");
  const completedTasks = Tasks.filter((t) => {
    return t.isCompleted;
  });
  const incompletedTasks = Tasks.filter((t) => {
    return !t.isCompleted;
  });
  let tasksToBeRendered = Tasks;

  if (displayedTasksType === "completed") {
    tasksToBeRendered = completedTasks;
  } else if (displayedTasksType === "incompleted") {
    tasksToBeRendered = incompletedTasks;
  }
  const values = tasksToBeRendered.map((t) => {
    return <Todo key={t.id} task={t} />;
  });
  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("Tasks"));
    if (Array.isArray(storageTasks) && storageTasks.length > 0) {
      setTasks(storageTasks);
    }
  }, []);
  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography
            gutterBottom
            style={{
              color: "#D81B60",
              letterSpacing: "2px",
              margin: "10px",
              fontSize: "35px",
              fontWeight: "bold",
            }}
            variant="h3"
          >
            My Pretty Tasks
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <div
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                value="all"
                className="b1"
                onClick={() => setDisplayedTasksType("all")}
                style={{
                  color: displayedTasksType === "all" ? "#D81B60" : "white", 
                  background:
                    displayedTasksType === "all" ? "white" : "#F48FB1", 
                  border: "2px solid #F48FB1",
                  borderRadius: "4px 4px 0 0",
                  marginTop: "10px",
                  padding: "10px",
                  width: "100px",
                  fontWeight: "bold",
                }}
              >
                All
              </Button>
              <Button
                value="completed"
                onClick={() => setDisplayedTasksType("completed")}
                className="b1"
                style={{
                  color:
                    displayedTasksType === "completed" ? "#D81B60" : "white",
                  background:
                    displayedTasksType === "completed" ? "white" : "#F48FB1", 
                  border: "2px solid #F48FB1",
                  borderRadius: "4px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  marginTop: "10px",
                  padding: "10px",
                  width: "130px",
                  fontWeight: "bold",
                }}
              >
                Completed
              </Button>

              <Button
                value="incompleted"
                onClick={() => setDisplayedTasksType("incompleted")}
                className="b1"
                style={{
                  color:
                    displayedTasksType === "incompleted" ? "#D81B60" : "white",
                  background:
                    displayedTasksType === "incompleted" ? "white" : "#F48FB1", 
                  border: "2px solid #F48FB1",
                  borderRadius: "0 0 4px 4px",
                  marginTop: "10px",
                  padding: "10px",
                  width: "130px",
                  fontWeight: "bold",
                }}
              >
                InCompleted
              </Button>
            </div>
          </Box>
          {values}
          <Grid container style={{ marginTop: "20px" }}>
            <Grid
              size={8}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                label="New Task"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                sx={{
                  width: "90%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#F48FB1",
                    },
                    "&:hover fieldset": {
                      borderColor: "#F48FB1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F48FB1",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#D81B60",
                    fontWeight: "bold",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                style={{
                  width: "80%",
                  height: "80%",
                  background: titleInput.length === 0 ? "#f8c1d9" : "#F48FB1", 
                  color: titleInput.length === 0 ? "#ffffffa0" : "white", 
                  borderRadius: "4px 4px 0 0",
                  fontWeight: "bold",
                  // border: "solid 2px #F48FB1",
                  padding: "10px",
                  cursor: titleInput.length === 0 ? "not-allowed" : "pointer", 
                  transition: "0.3s ease",
                }}
                onClick={handleAddClick}
                disabled={titleInput.length === 0}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
