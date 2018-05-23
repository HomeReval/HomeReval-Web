import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

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

import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import CloseIcon from 'material-ui-icons/Close';
import RowingIcon from 'material-ui-icons/Rowing';

import { history } from "../helpers/history"
import FourOFour from "./404"
import Home from './Home'
import Exercises from './Exercises'
import Exercise from './Exercise'

import {
  getExercises,
} from '../actions/exerciseActions'

class App extends React.Component {

  getExercises = (index) => {
    this.props.dispatch(getExercises(index))
  }

  state = {
    left: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    return (
      <div>
        <Router history={ history }>
          <Fragment>

            <AppBar position="fixed" style={{background: 'transparent', color: 'black', boxShadow: 'none'}}>
              <Toolbar>
                <IconButton onClick={this.toggleDrawer(true)} style={styles.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" style={styles.flex}>
                  HomeReval
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>

            <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >

                <div style={{width: '250px'}}>
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
                        <ListItemText primary="Exercises" />
                      </ListItem>
                    </Link>
                  </List>

                  <Divider/>

                  <List>
                    <Link to={"/"} style={{textDecoration: 'none', color: 'black'}}>
                      <ListItem>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </Link>
                  </List>

                </div>
              </div>
            </Drawer>

            <Switch>

              <Route exact path='/' render={ (props) => (
                <Home { ...props } />
              ) } />

              <Route exact path='/exercises' render={ (props) => (
                <Exercises { ...props }
                  state={this.props.state}
                  getExercises={this.getExercises}/>
              ) } />

              <Route exact path='/exercise/:id' render={ (props) => (
                <Exercise { ...props }
                  state={this.props.state}
                  getExercises={this.getExercises}/>
              ) } />

              <Route path='*' render={ (props) => (
                <FourOFour { ...props }/>
              ) } />

            </Switch>

          </Fragment>
        </Router>
      </div>
    )
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  state: state
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
