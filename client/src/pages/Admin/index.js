import React from 'react';

// importing components from material-ui I used to build the site 
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import SearchIcon from '@material-ui/icons/Search';

// importing custom components i wrote
import PlotEditor from '../../components/PlotEditor';

import './style.css'

const drawerWidth = 240;

// hook to create classes - this is from material-ui website
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function AdminPage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
                The Church of Saint Martin in the Fields - Columbarium -- ADMIN PAGE
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
            <div className="drawer-header">
                <Typography variant="h5" noWrap>
                    Menu
                </Typography>
            </div>
            <Divider />
        <List>
          <ListItem button onClick={()=>props.handleMenuClick("PLOT")}>
            <ListItemIcon><EditIcon/></ListItemIcon>
            <ListItemText primary={'Edit a Plot'} />
          </ListItem>
          <Divider />
          <ListItem button onClick={()=>props.handleMenuClick("USERS")}>
            <ListItemIcon><PersonAddOutlinedIcon /></ListItemIcon>
            <ListItemText primary={'Manage Users'} />
          </ListItem>
        <Divider />
          <ListItem button onClick={()=>props.handleMenuClick("GRID")}>
              <ListItemIcon><ViewComfyIcon/></ListItemIcon>
              <ListItemText primary="Back to Plot Map"/>
          </ListItem>
        <Divider />
          <ListItem button onClick={()=>props.handleUserLogout()}>
              <ListItemIcon><ViewComfyIcon/></ListItemIcon>
              <ListItemText primary="LOG OUT"/>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField id="plot-search-id" label="plot #" />
          </Grid>
          <Grid item>
          <Button variant="contained" color="primary"
            onClick={() => props.handleAdminSearch(parseInt(document.getElementById('plot-search-id').value))}>
            Go!
          </Button>
          </Grid>
        </Grid>
        <hr />
        <PlotEditor
          plot={props.plot}
          handleSaveData={props.handleSaveData}
          data={props.plotData}
          handleShowNewPersonForm={props.handleShowNewPersonForm}
          handleFileUpload={props.handleFileUpload}
        />
      </main>
    </div>
  );
}
