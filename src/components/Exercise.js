import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactGauge from 'react-gauge-capacity';

class Exercise extends Component {
  render() {

    let currentExercise = this.props.exercises.find(x => x.id == this.props.match.params.id);
    let score = currentExercise.exerciseResults[0].score;
    let scoreDeg = score * 180 / 100;

    return(
      <div style={styles.center}>
        <ReactGauge {...options} arrowValue={ scoreDeg/180 } />

        <p>Score: {score} </p>
        <a href="/">Hoe wij hier aan komen</a>
      </div>
    )
  }
}

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
            end: 20/180,
            color: "#f3595b"
        },
        {
            start: 20/180,
            end: 100/180,
            color: "#ffc875"
        },
        {
            start: 100/180,
            end: 180/180,
            color: "#83d7c0"
        }]

};

const styles = {
  center: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    maxWidth: '400px',
    height: '300px',
    textAlign: 'center',
    color: '#9E9E9E'
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  exercises: state.exercise.exercises
})

export default connect(mapStateToProps, mapDispatchToProps)(Exercise)
