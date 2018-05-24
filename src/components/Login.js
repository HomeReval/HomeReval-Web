import React from 'react'
import { Link } from 'react-router-dom'

import { Paper, TextField, Button } from 'material-ui'

class Login extends React.Component {
  render() {

    if (this.props.drawerVariant == 'permanent'){
      this.props.hideDrawer()
    }

    return(
      <div style={styles.center}>
        <Paper style={styles.paper}>

        <TextField
          id="password-input"
          label="Gebruikersnaam"
          type="text"
          autoComplete="current-password"
          margin="normal"
          autoFocus={true}
        />

        <TextField
          id="password-input"
          label="wachtwoord"
          type="password"
          autoComplete="current-password"
          margin="normal"
        />

          <Link to={"/"} style={{textDecoration: 'none', color: 'black'}}>
            <Button>login</Button>
          </Link>
        </Paper>
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
    left: 0,
    maxWidth: '350px',
    height: '350px',
    textAlign: 'center',
    color: '#9E9E9E'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    height: '350px',
    width: '300px',
    padding: '24px'
  }
}

export default Login
