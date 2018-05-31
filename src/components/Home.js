import React from 'react'
import { Paper } from '@material-ui/core'

class Home extends React.Component {

  constructor( props ) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind( this );
  }

  //Check drawer state on component load
  componentWillMount(){
    if ( this.props.drawerVariant === 'temporary' ){
      this.props.showDrawer()
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener( 'resize', this.updateWindowDimensions );
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.updateWindowDimensions );
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {

    let imgUrl = require( '../IMG/homebg.jpg' )

    return(
      <div>
        <div style={{
          height: this.state.height, backgroundImage: 'url(' + imgUrl + ')',
          backgroundSize: 'cover',
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: '0.6'
        }}/>

        <div style={ styles.center }>
          <Paper style={ styles.paper }>
            <p style={{ fontSize: 40 }}> Welkom bij HomeReval </p>
          </Paper>
        </div>
      </div>
    )
  }
}

const styles = {
  center: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: '250px',
    maxWidth: '550px',
    height: '209px',
    textAlign: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: '550px',
    padding: '24px',
  }
};

export default Home
