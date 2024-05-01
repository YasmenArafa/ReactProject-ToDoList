import {useState} from 'react';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import {useContext, useEffect} from 'react';
import { TodosContext } from '../contexts/todosContext.js';
import { v4 as uuidv4 } from 'uuid';


import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from "./Todo.js";
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';


export default function TodoList() {

  const {todos, setTodos} = useContext(TodosContext);


    function changeDisplayedType(e){
      setDisplayTodosType(e.target.value);
    }

    const [titleInput, setTitleInput]= useState("");

    const [displayTodosType, setDisplayTodosType] = useState("all");
      //filteration arrays
      const completedTodos = todos.filter((t) => {
        return t.isCompleted
      })

          //filteration arrays
    const notCompletedTodos = todos.filter((t) => {
      return !t.isCompleted
    })

    let todosToBeRendered = todos

    if(displayTodosType == "completed"){
      todosToBeRendered = completedTodos
    }else if(displayTodosType == "non-completed"){
      todosToBeRendered = notCompletedTodos
    } else {
      todosToBeRendered = todos
    }
    const todosJsx = todosToBeRendered.map((t) => {
      return <Todo key={t.id} todo={t} />
    });



    useEffect(() => {
      const storageTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(storageTodos);
    },[])

    function handleAddClick(){
      const newTodo ={
        id: uuidv4(),
        title: titleInput,
        details: "",
        isCompleted: false,
      }

      const updatedTodos = [...todos, newTodo]
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTitleInput("");
    }

  return (
     
      <Container maxWidth="sm">
       <Card sx={{ minWidth: 275 }}
       style={{
        maxHeight: "90vh",
        overflowY: "scroll",
       }}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          مهامى
        </Typography>
        <Divider />

    {/* toggle button group */}
      <ToggleButtonGroup
      value={displayTodosType}
      style={{marginTop: "15px"}}
      exclusive
      onChange={changeDisplayedType}
      aria-label="text alignment"
      color="primary"
    >
      <ToggleButton style={{fontSize: "25px"}} value="all" >
        الكل
      </ToggleButton>
      <ToggleButton  style={{fontSize: "25px"}} value="completed" >
        منجز
      </ToggleButton>
      <ToggleButton  style={{fontSize: "25px"}} value="non-completed" >
        غير منجز
      </ToggleButton>
    </ToggleButtonGroup>
        {/* End toggle button group */}

{/* <Todo /> */}
{ todosJsx }

<Grid container spacing={2} style={{marginTop: "20px"}}>
<Grid xs={8}>
{/* <input type="text" /> */}
<TextField style={{width: "100%"}} id="outlined-basic" label="مهمة" variant="outlined" value={titleInput}
onChange={(e) => {
setTitleInput(e.target.value);
}}/>

</Grid>
<Grid xs={4}>
<button 
style={{
  width: "100%",height: "100%", borderRadius: "10px", border: "none",
  background: "#803D3B", fontSize: "30px", color: "white", fontFamily: "H", cursor: "pointer", boxShadow: "0px 7px 7px #333"
}} 
onClick={() => {
  handleAddClick();
}}
disabled={titleInput.length == 0}>اضافة</button>
</Grid>
</Grid>

      </CardContent>

    </Card>
      </Container>
  );
}