import './App.css';
import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./components/TodoList.js";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { TodosContext } from './contexts/todosContext.js';

const theme = createTheme({
  typography: {
    fontFamily: [
      "H",
    ]
},
palette: {
  primary: {
    main: '#803D3B',
  }
}
})
const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "اول الشهر لازم",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "اول الشهر لازم",
    isCompleted: false,
  },
  
]

function App() {
  

  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
    <div className="App" style={{display: "flex", justifyContent: "center", alignItems: "center", background: "#424242", height: "100vh", direction: "rtl", backgroundImage: 'url("https://i.pinimg.com/736x/5e/80/e1/5e80e1b396793571651efe9d8fb27a6f.jpg")', backgroundSize: "cover",backgroundPosition: "center"}}>

    <TodosContext.Provider value={{todos: todos, setTodos: setTodos}}>
    <TodoList />
    </TodosContext.Provider>

    </div>

    </ThemeProvider>
  );
}

export default App;
