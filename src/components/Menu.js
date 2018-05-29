import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import RowingIcon from '@material-ui/icons/Rowing';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CalendarIcon from '@material-ui/icons/DateRange';

class Menu extends React.Component {

  //Set drawer open side
  state = {
    left: false,
  };

  render() {

    //Get username from localstorage
    var username = localStorage.getItem('username')

    return(
      <Fragment>
      <AppBar position="fixed" style={{background: 'transparent', boxShadow: 'none', color: 'black'}}>
        <Toolbar>
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            HomeReval
          </Typography>
          {this.props.loggedIn ? (
            <Fragment>
              { username }
              <IconButton color="inherit">
                <AccountIcon />
              </IconButton>
            </Fragment>
          ) : (
            <Fragment>
              {this.props.drawerVariant === "permanent" ? (
                <Link to={"/login"} style={{textDecoration: 'none', color: 'black'}}>
                  <Button color="inherit">Inloggen</Button>
                </Link>) : (null)
              }
            </Fragment>
          )}

        </Toolbar>
      </AppBar>

        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)} variant={this.props.drawerVariant} style={{position: 'relative', zIndex: 1, width: '250px'}}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >

            <div style={{width: '250px', paddingTop: '65px'}}>
              <List>
                <Link to={"/"} style={{textDecoration: 'none', color: 'black'}}>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>


                {!this.props.loggedIn ? (null) : (
                  <Fragment>
                    <Link to={"/exercises"} style={{textDecoration: 'none', color: 'black'}}>
                      <ListItem button>
                        <ListItemIcon>
                          <CalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Deze week" />
                      </ListItem>
                    </Link>

                    <Link to={"/"} style={{textDecoration: 'none', color: 'black'}}>
                      <ListItem button>
                        <ListItemIcon>
                          <RowingIcon />
                        </ListItemIcon>
                        <ListItemText primary="List Item" />
                      </ListItem>
                    </Link>
                  </Fragment>
                )}
              </List>

              <Divider />

              <List>
                <Link to={"/"} style={{textDecoration: 'none', color: 'black'}}>
                  <ListItem button>
                    <ListItemText primary="Contact  " />
                  </ListItem>
                </Link>
                {!this.props.loggedIn ? (null) : (
                  <Link to={"/login"} onClick={() => this.props.logout()} style={{textDecoration: 'none', color: 'black'}}>
                    <ListItem button>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </Link>
                )}

              </List>

            </div>
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

export default Menu
