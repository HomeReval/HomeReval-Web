import React from 'react'
import { connect } from 'react-redux'
import { Paper, CircularProgress } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom'

import TileInfo from './TileInfo'

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

const monthNames = [ "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December" ];

class Exercises extends React.Component {

  //Check drawer state on component load
  componentWillMount(){
    if ( this.props.drawerVariant === 'temporary' ){
      this.props.showDrawer()
    }
  }

  render() {

    let d = new Date()

    return(
      <div style={ styles.root }>

        <div style={{ display: 'flex', width: '100%', height: '60px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '12px', justifyContent: 'space-between', width: '100%'}}>
            <div style={{ fontSize: '22px', color: '#2196f3' }}> Week { this.props.state.exercise.weekNumber } </div>
            <div> <b>Vandaag:</b> { d.getDate() } { monthNames[ d.getMonth() ] } { d.getFullYear() } </div>
          </div>

        </div>

        { this.props.state.exercise.fetchingExercises ? (
          <MuiThemeProvider theme={ theme }>
            <div style={ styles.loader }>
              <CircularProgress />
            </div>
          </MuiThemeProvider>
        ) : ( null )}

        { this.props.state.exercise.fetchedExercises && this.props.exercises.length === 0 ? (
          <div style={ styles.center }>
            Geen oefeningen gevonden.
          </div>
        ) : ( null )}

        <div style={ styles.tileWrapper }>
          { this.props.exercises.map( function( item, i ) {
            let exerciseSessionsDone = item.exerciseSessions.filter(e => e.isComplete).length
            let exerciseSessions = item.exerciseSessions.length
            return(
              <Link to={ "/exercise/" + item.id } key={ item.id } style={{ textDecoration: 'none', color: 'black' }}>
                <Paper  style={ styles.tile } onMouseOver={ null }>
                  <TileInfo state={ item } exerciseSessions={ exerciseSessions } exerciseSessionsDone={ exerciseSessionsDone }/>
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
    flexDirection: 'column',
    width: '100%'
  },
  tile: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px'
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  dispatch: dispatch
})

const mapStateToProps = ( state ) => ({
  exercises: state.exercise.exercises
})

export default connect( mapStateToProps, mapDispatchToProps )( Exercises )
