import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function AddBtn() {

    return(
        <Button variant="contained" color="primary" size="large" startIcon={<AddCircleOutlineIcon />}>
            Ingresa nueva pelicula
        </Button>
    )
    
}

export default AddBtn