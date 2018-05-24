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
} from 'material-ui';

import HomeIcon from 'material-ui-icons/Home';
import RowingIcon from 'material-ui-icons/Rowing';
import AccountIcon from 'material-ui-icons/AccountCircle';

class Menu extends React.Component {

  state = {
    left: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    return(
      <Fragment>
      <AppBar position="fixed" style={{background: 'transparent', boxShadow: 'none', color: 'black'}}>
        <Toolbar>
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            HomeReval
          </Typography>
          <Link to={"/login"} style={{textDecoration: 'none', color: 'black'}}>
            <Button color="inherit">Inloggen</Button>
          </Link>
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
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


                <Link to={"/exercises"} style={{textDecoration: 'none', color: 'black'}}>
                  <ListItem button>
                    <ListItemIcon>
                      <RowingIcon />
                    </ListItemIcon>
                    <ListItemText primary="Oefeningen" />
                  </ListItem>
                </Link>
              </List>

            </div>
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

export default Menu
