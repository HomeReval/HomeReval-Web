import React, { Fragment } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Paper, IconButton } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'

import { decompress } from "../helpers/decompress";

import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class BodyCanvas extends React.Component {

  constructor( props ){
    super( props )
    this.state = {
      playing: false,
      frame: 0,
      hover: false,
    }
  }

  componentWillMount() {
    this.data = JSON.parse( decompress( this.props.data ) )
  }

  componentDidMount() {
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext("2d")

    this.setState( { frame: 0 } )

    if ( this.props.autoPlay ){
      this.startInterval()
    }
  }

  update = () => {
    this.drawBody( this.data.ConvertedBodies[this.state.frame].CheckJoints )

    this.setState( { frame: this.state.frame + 1 } )

    if( ( this.data.ConvertedBodies.length -1 ) < this.state.frame ){
      this.setState( { frame: 0 } )
    }
}

  startInterval = () => {
    if( this.state.playing === false ){
      this.interval = setInterval( this.update, 100/3 );
      this.setState( { playing: true } )
    }
  }

  stopInterval = () => {
    clearInterval( this.interval );
    this.setState( { frame: 0 } )
    this.setState( { playing: false } )
  }

  pauseInterval = () => {
    clearInterval( this.interval );
    this.setState( { playing: false } )
  }

  sliderUpdate = ( e, value ) => {
    this.update()
    this.setState( { frame: value } )
  }

  togglePlay = () => {
    if ( this.state.playing ) {
      this.pauseInterval()
    } else {
      this.startInterval()
    }
  }

  _onMouseOver = () => {
    this.setState( {hover: true } );
  };

  _onMouseOut = () => {
    this.setState( {hover: false } );
  };

  drawBody = ( checkJoints ) => {
    this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

    let headSize = 20
    let bigJoint = 5
    let smallJoint = 3

    //Head + Torso
    this.drawLine( checkJoints.Head.Position, checkJoints.Neck.Position )
    this.drawLine( checkJoints.Neck.Position, checkJoints.SpineShoulder.Position )
    this.drawLine( checkJoints.SpineShoulder.Position, checkJoints.SpineMid.Position )
    this.drawLine( checkJoints.SpineMid.Position, checkJoints.SpineBase.Position )

    //Left Shoulder-Hand
    this.drawLine( checkJoints.SpineShoulder.Position, checkJoints.ShoulderLeft.Position )
    this.drawLine( checkJoints.ShoulderLeft.Position, checkJoints.ElbowLeft.Position )
    this.drawLine( checkJoints.ElbowLeft.Position, checkJoints.WristLeft.Position )
    this.drawLine( checkJoints.WristLeft.Position, checkJoints.HandLeft.Position )
    this.drawLine( checkJoints.HandLeft.Position, checkJoints.ThumbLeft.Position )
    this.drawLine( checkJoints.HandLeft.Position, checkJoints.HandTipLeft.Position )

    //Right Shoulder-Hand
    this.drawLine( checkJoints.SpineShoulder.Position, checkJoints.ShoulderRight.Position )
    this.drawLine( checkJoints.ShoulderRight.Position, checkJoints.ElbowRight.Position )
    this.drawLine( checkJoints.ElbowRight.Position, checkJoints.WristRight.Position )
    this.drawLine( checkJoints.WristRight.Position, checkJoints.HandRight.Position )
    this.drawLine( checkJoints.HandRight.Position, checkJoints.ThumbRight.Position )
    this.drawLine( checkJoints.HandRight.Position, checkJoints.HandTipRight.Position )

    //Left Hip-Foot
    this.drawLine( checkJoints.SpineBase.Position, checkJoints.HipLeft.Position )
    this.drawLine( checkJoints.HipLeft.Position, checkJoints.KneeLeft.Position )
    this.drawLine( checkJoints.KneeLeft.Position, checkJoints.AnkleLeft.Position )
    this.drawLine( checkJoints.AnkleLeft.Position, checkJoints.FootLeft.Position )

    //Right Hip-Foot
    this.drawLine( checkJoints.SpineBase.Position, checkJoints.HipRight.Position )
    this.drawLine( checkJoints.HipRight.Position, checkJoints.KneeRight.Position )
    this.drawLine( checkJoints.KneeRight.Position, checkJoints.AnkleRight.Position )
    this.drawLine( checkJoints.AnkleRight.Position, checkJoints.FootRight.Position )

    //Head + Torso
    this.drawJoint( checkJoints.Head.Position, headSize );
    this.drawJoint( checkJoints.Neck.Position, smallJoint );
    this.drawJoint( checkJoints.SpineShoulder.Position, bigJoint );
    this.drawJoint( checkJoints.SpineMid.Position, bigJoint );
    this.drawJoint( checkJoints.SpineBase.Position, bigJoint );

    //Left Shoulder-Hand
    this.drawJoint( checkJoints.ShoulderLeft.Position, bigJoint );
    this.drawJoint( checkJoints.ElbowLeft.Position, bigJoint );
    this.drawJoint( checkJoints.WristLeft.Position, smallJoint );
    this.drawJoint( checkJoints.HandLeft.Position, smallJoint );
    this.drawJoint( checkJoints.ThumbLeft.Position, smallJoint );
    this.drawJoint( checkJoints.HandTipLeft.Position, smallJoint );

    //Right Shoulder-Hand
    this.drawJoint( checkJoints.ShoulderRight.Position, bigJoint );
    this.drawJoint( checkJoints.ElbowRight.Position, bigJoint );
    this.drawJoint( checkJoints.WristRight.Position, smallJoint );
    this.drawJoint( checkJoints.HandRight.Position, smallJoint );
    this.drawJoint( checkJoints.ThumbRight.Position, smallJoint );
    this.drawJoint( checkJoints.HandTipRight.Position, smallJoint );

    //Left Hip-Foot
    this.drawJoint( checkJoints.HipLeft.Position, bigJoint );
    this.drawJoint( checkJoints.KneeLeft.Position, bigJoint );
    this.drawJoint( checkJoints.AnkleLeft.Position, bigJoint );
    this.drawJoint( checkJoints.FootLeft.Position, bigJoint );

    //Right Hip-Foot
    this.drawJoint( checkJoints.HipRight.Position, bigJoint );
    this.drawJoint( checkJoints.KneeRight.Position, bigJoint );
    this.drawJoint( checkJoints.AnkleRight.Position, bigJoint );
    this.drawJoint( checkJoints.FootRight.Position, bigJoint );

  }

  drawJoint = (position, size) => {
  	this.ctx.beginPath();
  	this.ctx.arc(( position.X - ( position.X * 2 ) - ( position.X * 2 ) * 100 ) + 200, ( position.Y - ( position.Y * 2 ) * 100 ) + 170, size, 0, 2 * Math.PI );
    this.ctx.fillStyle = '#2196f3';
    this.ctx.fill();
  }

  drawLine = (position1, position2) => {
      this.ctx.beginPath();
      this.ctx.moveTo(( position1.X - ( position1.X * 2 ) - ( position1.X * 2 ) * 100 ) + 200, ( position1.Y - ( position1.Y * 2 ) * 100 ) + 170);
      this.ctx.lineTo(( position2.X - ( position2.X * 2 ) - ( position2.X * 2 ) * 100 ) + 200, ( position2.Y - ( position2.Y * 2 ) * 100 ) + 170);
      this.ctx.stroke();
  }

  render() {
    return(
      <div style={styles.root}>
        <canvas ref="canvas" width={ 400 } height={ 400 } onClick={ this.togglePlay }/>

        { this.props.onCanvasControls ? (
          <Fragment>
            { this.state.playing ? (
              <div style={{ backgroundColor: 'white', opacity: this.state.hover ? '0.6' : '0.0', position: 'absolute', padding: '188px' }}
              onClick={ this.togglePlay }
              onMouseOver={ this._onMouseOver }
              onMouseOut={ this._onMouseOut }>
              <PauseIcon/>
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', opacity: '0.6', position: 'absolute', padding: '188px' }} onClick={ this.togglePlay }>
              <PlayIcon/>
              </div>
            )}
          </Fragment>
        ) : (
          null
        )}

        <Paper style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          { this.props.controls ? (
            <Fragment>
              { this.state.playing ? (
                <Fragment>
                  <IconButton onClick={ this.pauseInterval }>
                    <PauseIcon />
                  </IconButton>
                  <IconButton onClick={ this.stopInterval }>
                    <StopIcon/>
                  </IconButton>
                </Fragment>
              ) : (
                <Fragment>
                  <IconButton onClick={ this.startInterval }>
                    <PlayIcon/>
                  </IconButton>
                  <IconButton onClick={ this.stopInterval }>
                    <StopIcon/>
                  </IconButton>
                </Fragment>
              )}

              <MuiThemeProvider theme={ theme }>
                <div style={{ marginLeft: '24px', marginRight: '24px', width: '100%', alignItems: 'center', display: 'flex' }}>
                  <Slider value={ this.state.frame } min={ 0 } max={ this.data.ConvertedBodies.length -1 } step={ 1 } onChange={ this.sliderUpdate }/>
                </div>
              </MuiThemeProvider>

            </Fragment>
          ) : (
            null
          )}
        </Paper>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
  }
};

export default BodyCanvas
