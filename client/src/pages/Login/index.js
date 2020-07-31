import React from 'react';
import { withRouter } from "react-router-dom";

// importing components from material-ui I used to build the site 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// importing custom components i wrote
import LoginForm from '../../components/LoginForm'
import VariableSpacer from '../../components/VariableSpacer'

// hook to create classes - this is from material-ui website
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

function LoginPage(props) {
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
                handleLogin={props.handleLogin}
                openMessageBox={props.openMessageBox}/>
                <VariableSpacer
                  height={250} 
                />
                  <Button 
                    onClick={() => window.location = "/"} >
                    Back to Plot Map
                  </Button>
            </Container>
        </main>
    </div>
  );
}

export default withRouter(LoginPage)