import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'

import { history } from "../helpers/history"
import FourOFour from "./404"
import Home from './Home'

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={ history }>
          <Fragment>

            <Switch>

              <Route exact path='/' render={ (props) => (
                <Home { ...props } />
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

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  state: state
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
