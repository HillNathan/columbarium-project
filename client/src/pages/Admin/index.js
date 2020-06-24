import React from 'react';
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

import EditIcon from '@material-ui/icons/Edit';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import QueueOutlinedIcon from '@material-ui/icons/QueueOutlined';

import './style.css'

const drawerWidth = 240;

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

export default function AdminPage() {
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
          {['Edit a Plot', 'Edit a Person','Add a Person',].map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{text.slice(0,4) === "Edit" ? <EditIcon/> : <QueueOutlinedIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Create a User'].map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon><PersonAddOutlinedIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem button>
                <ListItemIcon><ViewComfyIcon/></ListItemIcon>
                <ListItemText primary="Back to Plot Map"/>
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h3" noWrap>
                This route will be protected.
        </Typography>
      </main>
    </div>
  );
}
