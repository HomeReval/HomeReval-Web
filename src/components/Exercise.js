import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ReactGauge from './react-gauge-capacity';

import {
  IconButton,
  Typography,
  Paper
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';

import { history } from '../helpers/history';

class Exercise extends Component {

  //Check drawer state on component load
  componentWillMount(){
    if (this.props.drawerVariant === 'temporary'){
      this.props.showDrawer()
    }
  }

  render() {

    //eslint-disable-next-line
    let currentExercise = this.props.exercises.find(x => x.id == this.props.match.params.id);

    //If exercise id doesnt exist redirect to /exercises
    if ( currentExercise === undefined ){
      history.push('/exercises')

      return null;
    }

    let exerciseSessions = currentExercise.exerciseSessions.filter(e => e.isComplete)

    return(
      <div style={{ margin: '100px' }}>
        <div style={{ display: 'flex' }}>
          <IconButton color="inherit" onClick={ history.goBack }>
            <BackIcon />
          </IconButton>

          <Typography variant="title" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            { currentExercise.exercise.description }
          </Typography>
        </div>

        <div style={{ margin: '50px' }}>
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
                <Paper key={ item.id } style={ styles.paper }>
                  <div style={ styles.root }>

                    <DateFormat time={ new Date(item.date) }/>

                    <div style={ styles.gauge }>
                    <div>
                      <ReactGauge { ...options } arrowValue={ scoreDeg/180 } />

                      <p style={{ textAlign: 'center', marginBottom: 0 }}>Score: { score } </p>
                      </div>
                    </div>
                  </div>
                </Paper>
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
    ranges: [{
            start: 0,
            end: 81/180,
            color: '#f3595b'
        },
        {
            start: 81/180,
            end: 135/180,
            color: '#ffc875'
        },
        {
            start: 135/180,
            end: 180/180,
            color: '#83d7c0'
        }]

};

function DateFormat(props){
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

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gauge: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: '50px',
    marginRight: '50px',
    marginTop: '15px',
    marginBottom: '15px',
    padding: '24px'
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
