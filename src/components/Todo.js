
import './Todo.css';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import CheckIcon from '@mui/icons-material/Check';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import { useContext } from 'react';
import { useState } from 'react';
import { TodosContext } from './../contexts/todosContext';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// const open = true;

// const open = false; 

export default function Todo({todo}) {

  const [showDeleteDialog, setShowDeleteDialog] =
  useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const [updatedTodo, setUpdatedTodo] = useState({title: todo.title, details: todo.details});

  const {todos, setTodos} = useContext(TodosContext);

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
        if(t.id == todo.id){
          // if(t.isCompleted == true){
          //   t.isCompleted = false
          // }else {
          // t.isCompleted = true
          // }

          t.isCompleted = !t.isCompleted;
        }
        return t
      })
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateClick(){
    setShowUpdateDialog(true);
  }

  function handleClosing(){
    setShowUpdateDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      
      return t.id != todo.id

    })
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if(t.id == todo.id){
        return {...t, title: updatedTodo.title, details: updatedTodo.details}
    } else {
      return t
    }
  });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  return (
    <>
        <Dialog style={{direction: "rtl"}}
        open={showDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل ترغب فى حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            يمكنك الرجوع فى كلامك اذا ضغطت على زر اغلاق حيث لا يمكنك التراجع فى الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowDeleteDialog(false);
          }}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* update dialog */}
      <Dialog style={{direction: "rtl"}}
        open={showUpdateDialog}
        onClose={handleClosing}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"تعديل المهمة"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({...updatedTodo, title: e.target.value})
            }}
          />
            <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({...updatedTodo, details: e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClosing()
          }}>الغاء</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>


    <Card className="TodoCard" style={{background: "#803D3B", color: "white", marginTop: "5px"}}>
      <CardContent >
      <Grid container spacing={2}>
        <Grid xs={8} style={{textAlign: "right"}}>    
             <Typography style={{ textDecoration: todo.isCompleted? "line-through" : 'none'}} variant="h5"  gutterBottom>
          {todo.title}
        </Typography>
        <Typography variant="h6"  gutterBottom>
           {todo.details}
        </Typography>
      
        </Grid>
        <Grid xs={4} style={{ textAlign: "left",display: "flex", justifyContent: "space-between", height: "fit-content", marginTop: "20px"}}>


        <IconButton 
        onClick={() => {
          handleCheckClick();
        }}
        className="iconButton"

        style={{fontSize: "30px",
        color: todo.isCompleted ?  "white" : "#8bc34a", 
        border: "solid #8bc34a 3px",
        background: todo.isCompleted? "#8bc34a" : "white"}}>
          <CheckIcon />
        </IconButton>


        <IconButton onClick={handleUpdateClick} className="iconButton" style={{ color: "#1769aa", border: "solid #1769aa 3px", background: "white"}}>
          <BorderColorIcon />
        </IconButton>

        <IconButton onClick={handleDeleteClick} className="iconButton" style={{color: "#b23c17", border: "solid #b23c17 3px", background: "white"}}>
          <DeleteIcon />
        </IconButton>
        </Grid>

      </Grid>
      </CardContent>
    </Card>
    
    </>
  );
}