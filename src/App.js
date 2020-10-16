import axios from 'axios';
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
import YesBtn from "./components/buttons/YesBtn";
import NoBtn from "./components/buttons/NoBtn";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    Spacing: 8,
    '& > *': {
      margin: theme.spacing(0.5)
    },
    container: {
      maxHeight: 440
    }
  }
}));

const baseUrl = "http://localhost:8080/"

function App() {

  const classes = useStyles();

  //------------------------------states and consume API---------------------------------//

  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [dopen, setDopen] = React.useState(false);
  const [eopen, setEopen] = React.useState(false);

  const [inputs, setInputs] = React.useState({
    id: 0,
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

  const handleClickDelOpen = () => {
    setDopen(true)
  }

  const handleDelClose = () => {
    setDopen(false)
  }

  const handleClickEdOpen = () => {
    setEopen(true)
  }

  const handleEdClose = () => {
    setEopen(false)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  //set data with selected
  const selMovie = (movie) => {
    setInputs(movie);
    handleClickDelOpen();
  }

  const selDataToEd = (dataEd) => {
    setInputs(dataEd);
    handleClickEdOpen();
  }

  //list movies
  const getPetition = async () => {
    await axios.get(baseUrl + "allMovies")
      .then(response => {
        setData(response.data);
      })
  }

  //add a movie
  const postData = async () => {
    await axios.post(baseUrl + "addMovie", inputs)
      .then(() => {
        setData(data.concat(inputs))
        handleClose()
      })
  }

  //delete movie

  const deleteItem = async () => {
    await axios.post(baseUrl + "deleteMovie/" + inputs)
      .then(() => {
        setData(data.filter(movie => movie.name !== inputs))
        handleDelClose()
      })
  }

  const editItem = async () => {
    await axios.post(baseUrl + "editMovie/" + inputs.id + "/" + inputs.name + "/" + inputs.description + "/" + inputs.actor + "/" + inputs.income)
      .then(() => {
        var newData = data
        newData.map(movie => {
          if (inputs.id === movie.id) {
            movie.name = inputs.name;
            movie.description = inputs.description;
            movie.actor = inputs.actor;
            movie.income = inputs.income;
          }
        })
        setData(newData);
        handleEdClose();
      })
  }

  useEffect(async () => {
    await getPetition()
  }, [])

  //--------------------------------------------------------------------------------//

  //----------------------------------create form to add movie-------------------------------//

  //create dialog to insert data
  const dialogAdd = (
    <div>
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

        </div>

      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
        <div onClick={() => handleClose()}>
          <CancelBtn />
        </div>
        <div onClick={() => postData()}>
          <SaveBtn />
        </div>
      </DialogActions>
    </div>
  )

  //--------------------------------------------------------------------------------//

  //------------------------create form to confirm delete element-------------------//

  const dialogConfirm = (

    <div>
      <DialogTitle>
        ¿Seguro que quiere eliminar la película {inputs}?
      </DialogTitle>
      <DialogActions style={{justifyContent: 'center'}}>
        <div onClick={() => deleteItem()}>
          <YesBtn />
        </div>
        <div onClick={() => handleDelClose()}>
          <NoBtn />
        </div>
      </DialogActions>
    </div>

  )

  //--------------------------------------------------------------------------------//

  //----------------------------------create form to edit movie-------------------------------//

  //create dialog to insert data
  const dialogEdit = (
    <div>
      <DialogContent>
        <div className={classes.root}>

          <TextField
            name="name"
            id="name"
            label="Ingresar pelicula"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={inputs.name}
          />
          <TextField
            name="description"
            id="genre"
            label="Genero"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={inputs.description}
          />
          <TextField
            name="actor"
            id="actor"
            label="protagonista"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={inputs.actor}
          />
          <TextField
            name="income"
            id="income"
            label="valor ganado(en dolares)"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={inputs.income}
          />

        </div>
      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
        <div onClick={() => handleEdClose()}>
          <CancelBtn />
        </div>
        <div onClick={() => editItem()}>
          <SaveBtn />
        </div>
      </DialogActions>
    </div>
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
    const item = data[i]
    const name = data[i].name;
    const genre = data[i].description;
    const actor = data[i].actor;
    const income = data[i].income;
    const editbtn = <div onClick={() => selMovie(name)}><EditBtn /></div>;
    const deletebtn = <div onClick={() => selDataToEd(item)}><DeleteBtn /></div>;
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
          <div>
            <Dialog open={dopen} onClose={() => handleDelClose()}>
              {dialogConfirm}
            </Dialog>
          </div>
          <div>
            <Dialog open={eopen} onClose={() => handleEdClose()}>
              {dialogEdit}
            </Dialog>
          </div>
        </Grid>
        <Grid item xs={12} align="center">
          <div>
            <div onClick={() => handleClickOpen()}>
              <AddBtn />
            </div>
            <div>
              <Dialog open={open} onClose={() => handleClose()}>
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
