import React from 'react'

class Home extends React.Component {
  render() {
    return(
      <div style={styles.errorPage}>
        <h1 style={{fontSize: '60px', margin:0}}>HOME</h1>
      </div>
    )
  }
}

const styles = {
  errorPage: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    maxWidth: '250px',
    height: '100px',
    textAlign: 'center',
    color: '#9E9E9E'
  }
}

export default Home
