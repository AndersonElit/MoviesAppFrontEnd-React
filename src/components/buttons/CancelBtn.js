import React from 'react';
import Button from '@material-ui/core/Button';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0.5)
        }
    },
    spaceButton: {
        marginRight: theme.spacing(2)
    }
}))

function CancelBtn() {

    const classes = useStyles()

    return (
        <Button className={classes.spaceButton} color="primary" variant="contained" startIcon={<CancelOutlinedIcon />}>
            Cancelar
        </Button>
    )
}

export default CancelBtn