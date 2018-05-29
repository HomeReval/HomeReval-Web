import React from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Paper, TextField, Button } from '@material-ui/core'
import { blue } from '@material-ui/core/colors';

import AccountIcon from '@material-ui/icons/AccountCircle';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      width: 0,
      height: 0
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  //Update the username and password variables
  onUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  //Check drawer state on component load
  componentWillMount(){
    if (this.props.drawerVariant === 'permanent'){
      this.props.hideDrawer()
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  //Submit on enter
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.login(this.state.username, this.state.password);
    }
  }

  render(){

    let imgUrl = require('../IMG/homebg.jpg')

    return (
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

        <div style={styles.center}>
          <Paper style={styles.loginPaper}>
            <MuiThemeProvider theme={theme}>

              <AccountIcon style={{width: '100%', fontSize: '250px', color: '#2196f3'}}/>

              <TextField
                error={this.props.rejected != null}
                label="Gebruikersnaam"
                margin="normal"
                autoFocus={true}
                onChange={ this.onUsernameChange }
                onKeyPress={ this._handleKeyPress }
                />

              <TextField
                error={this.props.rejected != null}
                label="wachtwoord"
                type="password"
                margin="normal"
                onChange={ this.onPasswordChange }
                onKeyPress={ this._handleKeyPress }
                />

              <Button color="primary" style={{width: "100%", marginTop: '24px'}}
                onClick={ () => this.props.login(this.state.username, this.state.password)}>Login</Button>

            </MuiThemeProvider>
          </Paper>
        </div>

      </div>
    );
  }
}



const styles = {
  center: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    maxWidth: '350px',
    height: '502px',
    textAlign: 'center',
    color: '#9E9E9E'
  },
  loginPaper: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '24px',
  }
};

export default Login;
