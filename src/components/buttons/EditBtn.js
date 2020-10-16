import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5)
        }
    }
}))

function EditBtn() {
    
    const classes = useStyles()

    return (
        <div  className={classes.root}>
            <Button variant="contained" color="default" size="small" startIcon={<EditOutlinedIcon />}>
                Editar
            </Button>
        </div>
    )
}

export default EditBtn