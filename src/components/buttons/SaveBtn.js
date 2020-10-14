import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

function SaveBtn() {

    return (
        <Button variant="contained" color="secondary" startIcon={<SaveIcon />}>
            guardar
        </Button>
    )
    
}

export default SaveBtn