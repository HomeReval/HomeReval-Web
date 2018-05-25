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
    this.state = {username: '', password: ''}

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  componentWillMount(){
    if (this.props.drawerVariant === 'permanent'){
      this.props.hideDrawer()
    }
  }

  render(){
    return (
      <div>

        <div style={styles.center}>
          <Paper style={styles.loginPaper}>
            <MuiThemeProvider theme={theme}>

              <AccountIcon style={{width: '100%', fontSize: '250px', color: '#2196f3'}}/>

              <TextField
                label="Gebruikersnaam"
                margin="normal"
                autoFocus={true}
                onChange={ this.onUsernameChange }
                />

              <TextField
                label="wachtwoord"
                type="password"
                margin="normal"
                onChange={ this.onPasswordChange }
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
