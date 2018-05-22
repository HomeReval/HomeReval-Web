import React from 'react'
import { connect } from 'react-redux'
import { Paper } from 'material-ui'
import { Link } from 'react-router-dom'

class Exercises extends React.Component {
  render() {

    console.log(this.props.exercises);

    return(
      <div style={styles.root}>
        {this.props.exercises.map(function(item, i){
          return(
            <Link to={"/exercise/" + item.id} style={{textDecoration: 'none', color: 'black'}}>
            <Paper key={item.id} style={styles.tile}>
              {item.id}
            </Paper>
            </Link>
          )
        }, this)}
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '100px'
  },
  tile: {
    width: '200px',
    height: '200px',
    margin: '10px'
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

const mapStateToProps = (state) => ({
  exercises: state.exercise.exercises
})

export default connect(mapStateToProps, mapDispatchToProps)(Exercises)
