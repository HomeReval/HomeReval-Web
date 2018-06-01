import React from 'react'
import { connect } from 'react-redux'
import { Paper, IconButton, CircularProgress } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom'

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class Exercises extends React.Component {

  //Check drawer state on component load
  componentWillMount(){
    if ( this.props.drawerVariant === 'temporary' ){
      this.props.showDrawer()
    }
  }

  render() {

    let previousWeek = null
    let nextWeek = null

    if( this.props.state.exercise.weekNumber === 1){
      previousWeek = 52
    } else {
      previousWeek = this.props.state.exercise.weekNumber - 1
    }

    if( this.props.state.exercise.weekNumber === 52){
      nextWeek = 1
    } else {
      nextWeek = this.props.state.exercise.weekNumber + 1
    }

    return(
      <div style={ styles.root }>

        <div style={{ display: 'flex', width: '100%', height: '60px', marginBottom: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconButton onClick={ this.props.previous } style={{ marginBottom: '-4px' }}>
              <LeftIcon />
            </IconButton>
            <div style={{ fontSize: '20px', color: '#00000080' }}> Week { previousWeek }</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '48px', marginRight: '48px' }}>
            <div style={{ fontSize: '22px', color: '#2196f3' }}> Week { this.props.state.exercise.weekNumber } </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', color: '#00000080' }}> Week { nextWeek }</div>
            <IconButton onClick={ this.props.next } style={{ marginBottom: '-4px' }}>
               <RightIcon />
            </IconButton>
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
              <Link to={"/exercise/" + item.id} key={item.id} style={{ textDecoration: 'none', color: 'black' }}>
                <Paper  style={ styles.tile } onMouseOver={ null }>
                  <TileInfo date={ item } exerciseSessions={ exerciseSessions } exerciseSessionsDone={ exerciseSessionsDone }/>
                </Paper>
              </Link>
            )
          }, this ) }
        </div>
      </div>
    )
  }
}

function TileInfo(props){

  let startDate = new Date(props.date.startDate)
  let endDate = new Date(props.date.endDate)

  return(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', fontSize: '15px' }}>
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#2196f3' }}>
          { props.date.exercise.description }
        </div>
        <div> { props.date.amount}x per sessie </div>
        <div> { props.exerciseSessionsDone} / { props.exerciseSessions } Sessies gedaan</div>
      </div>
      <div style={{ fontSize: '14px', fontStyle: 'italic', display: 'flex', justifyContent: 'flex-end' }}>
        { startDate.getDate() + "-" + startDate.getMonth() + "-" + startDate.getFullYear() + " " }/
        { " " + endDate.getDate() + "-" + endDate.getMonth() + "-" + endDate.getFullYear()  }
      </div>
    </div>
  )
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
    width: '310px',
    height: '100px',
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
