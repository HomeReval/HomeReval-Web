import React from 'react'
import { connect } from 'react-redux'
import { Paper, IconButton, CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';

class Exercises extends React.Component {

  //Check drawer state on component load
  componentWillMount(){
    if ( this.props.drawerVariant === 'temporary' ){
      this.props.showDrawer()
    }
  }

  render() {
    return(
      <div style={ styles.root }>

        <div style={{ display: 'flex', width: '100%', height: '60px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconButton onClick={ this.props.previous } style={{ marginBottom: '-4px' }}>
              <LeftIcon />
            </IconButton>
            <div style={{ fontSize: '20px', color: '#00000080' }}> Week { this.props.state.exercise.weekNumber - 1 }</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '48px', marginRight: '48px' }}>
            <div style={{ fontSize: '22px', color: '#2196f3' }}> Week { this.props.state.exercise.weekNumber } </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', color: '#00000080' }}> Week { this.props.state.exercise.weekNumber + 1 }</div>
            <IconButton onClick={ this.props.next } style={{ marginBottom: '-4px' }}>
               <RightIcon />
            </IconButton>
          </div>
        </div>

        { this.props.state.exercise.fetchingExercises ? (
          <div style={ styles.loader }>
            <CircularProgress />
          </div>
        ) : ( null )}

        { this.props.state.exercise.fetchedExercises && this.props.exercises.length === 0 ? (
          <div style={ styles.center }>
            Geen oefeningen gevonden.
          </div>
        ) : ( null )}

        <div style={ styles.tileWrapper }>
          { this.props.exercises.map( function( item, i ) {
            return(
              <Link to={"/exercise/" + item.id} key={item.id} style={{ textDecoration: 'none', color: 'black' }}>
                <Paper  style={ styles.tile } onMouseOver={ null }>
                  { item.exercise.description }
                </Paper>
              </Link>
            )
          }, this ) }
        </div>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '100px',
    justifyContent: 'space-between',
  },
  loader: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: '250px',
    maxWidth: '42px',
    height: '42px',
    textAlign: 'center',
  },
  center: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: '250px',
    maxWidth: '270px',
    height: '27px',
    textAlign: 'center',
    fontSize: '22px',
    color: '#00000080'
  },
  tileWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%'
  },
  tile: {
    width: '300px',
    height: '100px',
    margin: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  dispatch: dispatch
})

const mapStateToProps = ( state ) => ({
  exercises: state.exercise.exercises
})

export default connect( mapStateToProps, mapDispatchToProps )( Exercises )
