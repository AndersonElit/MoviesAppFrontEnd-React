import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import NavBar from "./components/NavBar";
import EditBtn from "./components/buttons/DeleteBtn";
import DeleteBtn from "./components/buttons/EditBtn";
import AddBtn from "./components/buttons/AddBtn";
import CancelBtn from "./components/buttons/CancelBtn";
import SaveBtn from "./components/buttons/SaveBtn";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    Spacing: 8,
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  container: {
    maxHeight: 440
  }
}));

const baseUrl = "http://localhost:8080/"

function App() {

  const classes = useStyles();

  //------------------------------states and consume API---------------------------------//

  const [data, setData] = useState([])
  const [open, setOpen] = React.useState(false)

  const [inputs, setInputs] = React.useState({
    name: "",
    description: "",
    actor: "",
    income: 0
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  //list movies
  const getPetition = async () => {
    await axios.get(baseUrl + "allMovies")
      .then(response => {
        setData(response.data)
      })
  }

  //add a movie
  const postData = async () => {
    await axios.post("http://localhost:8080/addMovie", inputs)
      .then(() => {
        setData(data.concat(inputs))
        handleClose()
      })
  }

  useEffect(async () => {
    await getPetition()
  }, [])

  //--------------------------------------------------------------------------------//

  //----------------------------------create form to add movie-------------------------------//

  //create dialog to insert data
  const dialogAdd = (
    <DialogContent>
      <div className={classes.root}>

        <TextField
          name="name"
          id="name"
          label="Ingresar pelicula"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="description"
          id="genre"
          label="Genero"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="actor"
          id="actor"
          label="protagonista"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="income"
          id="income"
          label="valor ganado(en dolares)"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />

        <div align="center">

          <div onClick={handleClose}>
            <CancelBtn />
          </div>

          <div onClick={postData}>
            <SaveBtn />
          </div>
          
        </div>

      </div>
    </DialogContent>
  )

  //--------------------------------------------------------------------------------//

  //-------------------------data to build table------------------------------------//

  const columns = [
    { id: 'name', label: 'Nombre pelicula', minWidth: 170 },
    { id: 'genre', label: 'Genero', minWidth: 170 },
    { id: 'actor', label: 'protagonista', minWidth: 170 },
    { id: 'income', label: 'valor ganado(en dolares)', minWidth: 170 },
    { id: 'editbtn', label: ' ', minWidth: 100 },
    { id: 'deletebtn', label: ' ', minWidth: 100 }
  ]

  const rows = []

  for (var i = 0; i < data.length; i++) {
    const name = data[i].name;
    const genre = data[i].description;
    const actor = data[i].actor;
    const income = data[i].income;
    const editbtn = <EditBtn />;
    const deletebtn = <DeleteBtn />;
    const object = { name, genre, actor, income, editbtn, deletebtn };
    rows.push(object);
  }

  //--------------------------------------------------------------------------------//

  //---------------------create table to show all movies----------------------------//

  const table = (

    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  align="center"
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.label}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align="center">
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

  )

  //--------------------------------------------------------------------------------//

  return (

    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Box m={2} pt={5}>
            {table}
          </Box>
        </Grid>
        <Grid item xs={12} align="center">
          <div>
            <div onClick={handleClickOpen}>
              <AddBtn />
            </div>
            <div>
              <Dialog open={open} onClose={handleClose}>
                {dialogAdd}
              </Dialog>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>

  )
}

export default App;
