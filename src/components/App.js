import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom'

import { history } from "../helpers/history"
import FourOFour from "./404"
import Home from './Home'
import Menu from './Menu'
import Exercises from './Exercises'
import Exercise from './Exercise'

import {
  getExercises,
} from '../actions/exerciseActions'

class App extends React.Component {

  getExercises = (index) => {
    this.props.dispatch(getExercises(index))
  }

  render() {
    return (
      <div>
        <Router history={ history }>
          <Fragment>
            <div style={{display: 'flex', flexDirection: 'row',}}>

              <div style={{width: '250px'}}>
                <Menu />
              </div>

              <div style={{width: '100%'}}>
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
