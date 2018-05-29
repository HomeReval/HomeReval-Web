import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { history } from "../helpers/history"
import FourOFour from "./404"
import Login from "./Login"
import Home from './Home'
import Menu from './Menu'
import Exercises from './Exercises'
import Exercise from './Exercise'

import { login, logout, setLoggedIn, refreshLogin } from '../actions/userActions'
import { successAlertAction, errorAlertAction, hideAlertAction } from '../actions/alertActions'
import { getExercises } from '../actions/exerciseActions'
import { showDrawer, hideDrawer } from '../actions/componentActions'

class App extends React.Component {

  login = (username, password) => {
    this.props.dispatch(login(username, password))
  }

  logout = () => {
    this.props.dispatch(logout())
  }

  showDrawer = () => {
    this.props.dispatch(showDrawer())
  }

  setLoggedIn = () => {
    this.props.dispatch(setLoggedIn())
  }

  refreshLogin = () => {
    this.props.dispatch(refreshLogin())
  }

  //---------------

  hideDrawer = () => {
    this.props.dispatch(hideDrawer())
  }

  //--------------

  successAlert = (message) =>{
    this.props.dispatch(successAlertAction(message))
  }

  errorAlert = (message) =>{
    this.props.dispatch(errorAlertAction(message))
  }

  hideAlert = () =>{
    this.props.dispatch(hideAlertAction())
  }

  componentDidMount(){
    if(this.props.state.user.loggedIn){
      this.props.dispatch(getExercises())
    }
  }

  render() {
    return (
      <div>
        <Router history={ history }>
          <Fragment>
            <div style={{display: 'flex', flexDirection: 'row',}}>

              <div>
                <Menu drawerVariant={this.props.state.component.drawerVariant}
                  logout={this.logout}
                  loggedIn={this.props.state.user.loggedIn}/>
              </div>

              <div style={{width: '100%'}}>
                <Switch>

                  <Route exact path='/' render={ (props) => (
                    <Home { ...props }
                      showDrawer={this.showDrawer}
                      drawerVariant={this.props.state.component.drawerVariant}/>
                  ) } />

                  <Route exact path='/login' render={ (props) => (
                    <Login { ...props }
                      login={this.login}
                      hideDrawer={this.hideDrawer}
                      drawerVariant={this.props.state.component.drawerVariant}
                      rejected={this.props.state.user.error}/>
                  ) } />

                  <PrivateRoute exact path='/exercises' loggedIn={this.props.state.user.loggedIn} component={ (props) => (
                    <Exercises { ...props }
                      state={this.props.state}
                      showDrawer={this.showDrawer}
                      drawerVariant={this.props.state.component.drawerVariant}
                      loggedIn={this.props.state.user.loggedIn}/>
                  ) } />

                  <PrivateRoute exact path='/exercise/:id' loggedIn={this.props.state.user.loggedIn} component={ (props) => (
                    <Exercise { ...props }
                      state={this.props.state}
                      showDrawer={this.showDrawer}
                      drawerVariant={this.props.state.component.drawerVariant}
                      loggedIn={this.props.state.user.loggedIn}/>
                  ) } />

                  <Route path='*' render={ (props) => (
                    <FourOFour { ...props }
                      hideDrawer={this.hideDrawer}
                      drawerVariant={this.props.state.component.drawerVariant}/>
                  ) } />

                </Switch>
              </div>

            </div>
          </Fragment>
        </Router>
        <Snackbar
          open={this.props.state.alert.alert}
          message={this.props.state.alert.message}
          autoHideDuration={4000}
          onClose={this.hideAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.hideAlert}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.loggedIn === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  state: state
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
