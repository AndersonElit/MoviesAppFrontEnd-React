import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}))

function DeleteBtn() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained" color="secondary" size="small" startIcon={<DeleteOutlinedIcon />}>
                Eliminar
            </Button> 
        </div>
    )

}

export default DeleteBtn