import './App.css';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

//components
import TodoList from "./components/TodoList";
import { myContext } from "./context/myContext";

function App() {

    const myTasks = [
      {
        id: uuidv4(),
        title: "Makeup Time 💄",
        details: "Organize your makeup bag and try a new lipstick shade today.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Nail Care 💅",
        details:
          "Give yourself a mini manicure and paint your nails a cute color.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Shopping Spree 👜",
        details:
          "Treat yourself with a little shopping at your favorite boutique.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Skincare Routine 🧴",
        details:
          "Pamper your skin with a full skincare session: cleanse, exfoliate, and moisturize.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Hair Spa Day 💆‍♀️",
        details:
          "Give your hair some love with a nourishing hair mask or treatment.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Wardrobe Refresh 👗",
        details: "Organize your closet and pick out your outfit of the week.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Perfume Pick 🌸",
        details:
          "Choose your favorite perfume and set it out for a confidence boost today.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Journal & Relax 🫶",
        details:
          "Spend 15 minutes writing about your day while sipping tea or coffee.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Stretch & Breathe 🧘‍♀️",
        details:
          "Do a light stretching session and practice deep breathing for relaxation.",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Selfie Session 📸",
        details:
          "Get dolled up and take a few cute selfies to boost your mood!",
        isCompleted: false,
      },
    ];
  
const [Tasks, setTasks] = useState(myTasks);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#191b1f",
        height: "100vh",
      }}
    >
      <myContext.Provider value={{Tasks,setTasks}}>
        <TodoList />
      </myContext.Provider>
    </div>
  );
}

export default App;
