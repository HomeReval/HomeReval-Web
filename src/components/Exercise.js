import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactGauge from './react-gauge-capacity';

import Canvas from './BodyCanvas'

import { IconButton, Typography, Paper, CircularProgress } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import BackIcon from '@material-ui/icons/ArrowBack';

import { history } from '../helpers/history';

import { getRecordingsByExercise, setPrevId } from '../actions/exerciseActions'

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class Exercise extends Component {

  componentWillReceiveProps( newProps ) {
    if ( this.props.match.params.id !== newProps.match.params.id){
      console.log('jemoeder');
    }
  }

  //Check drawer state on component load
  componentWillMount() {
    if (this.props.drawerVariant === 'temporary'){
      this.props.showDrawer()
    }

    if ( this.props.state.exercise.prevExerciseId !== this.props.match.params.id ) {
      this.props.dispatch( getRecordingsByExercise( this.props.match.params.id ) )
      this.props.dispatch( setPrevId( this.props.match.params.id ) )
    }

  }

  render() {

    //eslint-disable-next-line
    let currentExercise = this.props.exercises.find(x => x.id == this.props.match.params.id);

    //If exercise id doesnt exist redirect to /exercises
    if ( currentExercise === undefined ){
      history.push('/')
      return null;
    }

    // Define exerciseSessions when isComplete is true
    let exerciseSessions = currentExercise.exerciseSessions.filter( e => e.isComplete )

    return(
      <div style={{ margin: '100px' }}>
        <div style={{ display: 'flex' }}>
          <IconButton color="inherit" onClick={ history.goBack }>
            <BackIcon />
          </IconButton>

          <Typography variant="title" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            { currentExercise.exercise.name }
          </Typography>
        </div>

        <div style={{ margin: '50px' }}>
          <div style={{ fontWeight: 'bold' }}>Uitleg:</div>
          { currentExercise.exercise.description + ", " + currentExercise.amount }x per sessie.
          <br/><br/>
          <div style={{ fontWeight: 'bold' }}>Opmerking:</div>
          { currentExercise.description }
        </div>

        { currentExercise.exerciseSessions.length === 0 || exerciseSessions.length === 0 ? (
          <div style={ styles.center }>
            Er zijn nog geen resultaten voor deze oefening.
          </div>
        ) : (
          <Fragment>
          { currentExercise.exerciseSessions.map( function( item, i ){
            let score = null;
            let scoreDeg = null;

            //Define score and convert it to 180deg
            if( item.isComplete ){
              score = item.exerciseResult.score
              scoreDeg = score * 180 / 100;
              return(
                <div key={ item.id } style={ styles.root }>
                  <Paper style={ styles.paper }>
                    <div style={ styles.wrapper }>

                      <div>
                        Sessie { i + 1 } / { currentExercise.exerciseSessions.length }
                        <DateFormat time={ new Date(item.date) }/>
                      </div>

                      <div style={ styles.gauge }>
                        <div>
                          <ReactGauge { ...options } arrowValue={ scoreDeg / 180 } />

                          <p style={{ textAlign: 'center', marginBottom: 0 }}>Score: <b>{ score }</b> / 100 </p>
                        </div>
                      </div>
                    </div>
                  </Paper>

                  { this.props.state.exercise.fetchedRecordings && this.props.state.exercise.recordings[i].exerciseResult.recording != null ? (
                    <Canvas data={ this.props.state.exercise.recordings[i].exerciseResult.recording } bypass={ false } controls={ true } onCanvasControls={ false } autoPlay={ false }/>
                  ) : (
                    <MuiThemeProvider theme={ theme }>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '500px', height: '448px' }}>
                        <CircularProgress />
                      </div>
                    </MuiThemeProvider>
                  ) }

                </div>
              )
            } else {
              return( null )
            }
          }, this ) }
          </Fragment>
        )}
      </div>
    )
  }
}

function DateFormat( props ){
  let minutes = props.time.getMinutes()
  if( minutes < 10 ){
    minutes = '0' + minutes
  }
  return(
    <div>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        { props.time.getDate() + "-" + props.time.getMonth() + "-" + props.time.getFullYear() }
      </div>
      { props.time.getHours() + ":" + minutes }
    </div>
  )
}

//Gauge option
let options = {
    isInnerNumbers: false,
    aperture: 180,
    radius : 115,
    tickOffset: 20,
    arcStrokeWidth: 40,
    miniTickLength: 1,
    miniTickStrokeWidth: 1,
    tickLabelOffset: 12,
    scaleDivisionNumber: 5,
    centralCircleRadius: 10,
    marks: [0, null, 10, null, 20, null , 30, null, 40, null, 50, null, 60, null, 70, null, 80, null , 90, null, 100],
    contentWidth: 360,
    svgContainerWidth: 360,
    svgContainerHeight: 200,
    gaugeCenterLineHeight: 180,
    viewBox: '30 0 300 200',
    ranges: [{ start: 0, end: 81/180, color: '#f3595b' },
             { start: 81/180, end: 135/180, color: '#ffc875' },
             { start: 135/180, end: 180/180, color: '#83d7c0' }]
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '48px',
    paddingLeft: '48px'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
  gauge: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paper: {
    marginRight: '24px',
    marginTop: '24px',
    padding: '24px',
    width: '100%'
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
}

const mapDispatchToProps = ( dispatch ) => ({
  dispatch: dispatch
})

const mapStateToProps = ( state ) => ({
  exercises: state.exercise.exercises
})

export default connect( mapStateToProps, mapDispatchToProps )( Exercise )
