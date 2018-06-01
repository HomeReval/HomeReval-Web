import axios from 'axios'
import store from '../Store';
import { getWeekNumber } from "../helpers/weekNumber"

export function initialize(){
  return function( dispatch ) {
    dispatch( currentWeekNumber() )
    dispatch( getExercises( store.getState().exercise.weekNumber ) )
  }
}

export function getExercises( week ) {
  return function( dispatch ) {
    dispatch( { type: 'FETCH_EXERCISES' } )

    let url = 'http://homereval.ga:5000/api/exerciseplanning/week/' + week ;

    //Get access token from local storage
    let token = localStorage.getItem( 'access_token' )

    axios.get( url, {
      headers: {
        'Authorization': 'Bearer '+ token
      }
    } ).then( ( response ) => {
        //Set fetched data
        dispatch( { type: 'FETCH_EXERCISES_FULFILLED', payload: response.data } )

      } )
      .catch( ( err ) => {
        //Set error
        dispatch( { type: 'FETCH_EXERCISES_REJECTED', payload: err } )
      } )
  }
}

export function currentWeekNumber() {
  return function( dispatch ) {
    dispatch( { type: 'CURRENT_WEEK', payload: getWeekNumber( new Date() ) } )
  }
}

export function previousWeek() {
  return function( dispatch ) {

    if ( store.getState().exercise.weekNumber === 1 ){
      dispatch( { type: 'PREVIOUS_WEEK', payload: 52 } )
    } else {
      dispatch( { type: 'PREVIOUS_WEEK', payload: ( store.getState().exercise.weekNumber - 1 ) } )
    }

    dispatch( clearExercises() )
    dispatch( getExercises( store.getState().exercise.weekNumber ) )
  }
}

export function nextWeek(){
  return function( dispatch ) {

    if ( store.getState().exercise.weekNumber === 52 ){
      dispatch( { type: 'PREVIOUS_WEEK', payload: 1 } )
    } else {
      dispatch( { type: 'PREVIOUS_WEEK', payload: ( store.getState().exercise.weekNumber + 1 ) } )
    }

    dispatch( clearExercises() )
    dispatch( getExercises( store.getState().exercise.weekNumber ) )
  }
}

export function clearExercises() {
    return { type: 'CLEAR_EXERCISES' }
}
