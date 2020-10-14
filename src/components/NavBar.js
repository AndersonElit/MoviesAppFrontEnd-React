import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}))

function NavBar() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="absolute">
                <Toolbar variant="dense">
                <Typography variant="h6" color="inherit">
                    MOVIESAPP
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;