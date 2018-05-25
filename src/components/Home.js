import React from 'react'

class Home extends React.Component {

  componentWillMount(){
    if (this.props.drawerVariant === 'temporary'){
      this.props.showDrawer()
    }
  }

  render() {
    return(
      <div>
        <div style={{width: '100%', height: '700px', overflow: 'hidden'}}>
          <img style={{width: '100%', marginTop: '-250px', opacity: '0.8'}} src={ require('../IMG/homebg.jpg') } alt="background"/>
        </div>

        <div style={{textAlign: 'center', color: '#777'}}>
          <p style={{fontSize: 50, marginTop: '100px'}}> Welkom bij HomeReval </p>
        </div>
      </div>
    )
  }
}

export default Home
