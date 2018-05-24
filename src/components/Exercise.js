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
  render() {

    let currentExercise = this.props.exercises.find(x => x.id == this.props.match.params.id);

    if (currentExercise === undefined){
      history.push('/exercises')

      return null;
    }

    let score = currentExercise.exerciseResults[0].score;
    let scoreDeg = score * 180 / 100;

    if (this.props.drawerVariant == 'temporary'){
      this.props.showDrawer()
    }

    return(
      <div style={{margin: '64px'}}>

        <div style={{display: 'flex'}}>
          <IconButton color="inherit" onClick={history.goBack}>
            <BackIcon />
          </IconButton>

          <Typography variant="title" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '50px'}}>
            Oefening {currentExercise.id}
          </Typography>
        </div>

        <div style={styles.root}>

          <div style={{width: '50%'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id convallis purus. Praesent vulputate ante eu neque ullamcorper, id eleifend nibh faucibus. Ut ac sem sit amet dui condimentum luctus eget at lorem. Curabitur tincidunt in dolor sit amet condimentum. Ut finibus laoreet vestibulum. Suspendisse ac nisl ac justo convallis sollicitudin nec non est. Ut volutpat magna vitae augue pharetra, vitae luctus sapien laoreet. Quisque malesuada aliquet mattis. Nam mattis euismod mattis.
          <br/>
          <br/>
            Ut sagittis congue nisi, consequat scelerisque nisi malesuada eget. Vivamus a neque libero. Duis rhoncus, lorem sit amet porttitor ornare, mauris eros egestas sapien, ut aliquam nibh elit vel nunc. Sed urna metus, suscipit nec eros quis, finibus tempor mi. Praesent eget lectus blandit, efficitur diam vitae, porttitor ligula. Sed dignissim, lacus in porttitor ullamcorper, diam ligula suscipit nibh, id malesuada ante ante in justo. In mi velit, vehicula in turpis quis, volutpat tempus orci. Quisque tortor lorem, efficitur nec dui eu, varius luctus nisl. Nullam pellentesque erat non tellus bibendum pharetra. Mauris sed dapibus risus, sit amet fermentum sem. Donec porttitor, libero et dictum rhoncus, sapien nulla fermentum quam, eget interdum massa est nec nulla. Nam turpis nunc, dictum nec tortor sit amet, molestie euismod dui. Maecenas a lacinia quam.
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
