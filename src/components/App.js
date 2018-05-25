import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom'

import { history } from "../helpers/history"
import FourOFour from "./404"
import Login from "./Login"
import Home from './Home'
import Menu from './Menu'
import Exercises from './Exercises'
import Exercise from './Exercise'

import { login, logout, checkLoggedIn } from '../actions/userActions'

import {
  showDrawer,
  hideDrawer,
} from '../actions/componentActions'

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

  hideDrawer = () => {
    this.props.dispatch(hideDrawer())
  }

  render() {
    return (
      <div>
        <Router history={ history }>
          <Fragment>
            <div style={{display: 'flex', flexDirection: 'row',}}>

              <div>
                <Menu drawerVariant={this.props.state.component.drawerVariant}/>
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
                      drawerVariant={this.props.state.component.drawerVariant}/>
                  ) } />

                  <Route exact path='/exercises' render={ (props) => (
                    <Exercises { ...props }
                      state={this.props.state}
                      showDrawer={this.showDrawer}
                      drawerVariant={this.props.state.component.drawerVariant}/>
                  ) } />

                  <Route exact path='/exercise/:id' render={ (props) => (
                    <Exercise { ...props }
                      state={this.props.state}
                      showDrawer={this.showDrawer}
                      drawerVariant={this.props.state.component.drawerVariant}/>
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
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  state: state
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
