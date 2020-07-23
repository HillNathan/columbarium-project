import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import LoginForm from '../../components/LoginForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div>
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
            The Church of Saint Martin in the Fields - Columbarium -- ADMIN LOGIN
            </Typography>
            </Toolbar>
        </AppBar>
        </div>
        <main>
            <Container>
              <LoginForm 
                handleLogin={props.handleLogin}/>
            </Container>
        </main>
    </div>
  );
}