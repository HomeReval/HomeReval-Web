import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactGauge from './react-gauge-capacity';

import {
  IconButton,
  Typography
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';

import { history } from "../helpers/history";

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
    if (currentExercise === undefined){
      history.push('/exercises')

      return null;
    }

    //Define score and convert it to 180deg
    let score = 87 // currentExercise.exerciseResults[0].score;
    let scoreDeg = score * 180 / 100;

    return(
      <div style={{margin: '64px'}}>

        <div style={{display: 'flex'}}>
          <IconButton color="inherit" onClick={history.goBack}>
            <BackIcon />
          </IconButton>

          <Typography variant="title" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            {currentExercise.description}
          </Typography>
        </div>

        <div style={styles.root}>

          <div style={{width: '50%'}}>
            Description hier
          </div>

          <div style={styles.gauge}>
          <div>
            <ReactGauge {...options} arrowValue={ scoreDeg/180 } />

            <p style={{textAlign: 'center'}}>Score: {score} </p>
            </div>
          </div>
        </div>
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
    viewBox: "30 0 300 200",
    ranges: [{
            start: 0,
            end: 81/180,
            color: "#f3595b"
        },
        {
            start: 81/180,
            end: 135/180,
            color: "#ffc875"
        },
        {
            start: 135/180,
            end: 180/180,
            color: "#83d7c0"
        }]

};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: '100px',
    marginTop: '24px'
  },
  gauge: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  exercises: state.exercise.exercises
})

export default connect(mapStateToProps, mapDispatchToProps)(Exercise)
