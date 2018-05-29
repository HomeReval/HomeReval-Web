import axios from "axios"
import {history} from "../helpers/history"
import { getExercises, clearExercises } from './exerciseActions'

//User login action
export function login(username, password) {
  return function(dispatch) {
    dispatch({type: "USER_FETCH_LOGIN"})

    let url = "http://136.144.132.176:5000/api/user/login";

    //Post login request
    axios.post( url, {
        "username":username,
        "password":password
      }
    ).then((response) => {
        //Set tokens in local storage
        localStorage.setItem('access_token', response.data.accessToken)
        localStorage.setItem('refresh_token', response.data.refreshToken)
        localStorage.setItem('expires', response.data.expires)
        localStorage.setItem('username', username)

        //Set logged in to true
        dispatch({type: "USER_FETCH_LOGIN_FULFILLED", payload: username})

        //Redirect to home
        history.push('/')

        //Fetch user exercises
        dispatch(getExercises())

        //Display alert
        dispatch({type: "DISPLAY_SUCCESS_ALERT",payload: "Ingelogd!"})
      })
      .catch((err) => {
        //Set error
        dispatch({type: "USER_FETCH_LOGIN_REJECTED", payload: err})

        //Display alert
        dispatch({type: "DISPLAY_ERROR_ALERT",payload: "Gebruikersnaam of wachtwoord is niet juist!"})
      })
  }
}

export function refreshLogin(){
  return function(dispatch) {
    dispatch({type: "USER_FETCH_LOGIN"})

    let url = "http://136.144.132.176:5000/api/user/token/refresh";

    //Get current token and username from local storage
    let token = localStorage.getItem('refresh_token')
    let username = localStorage.getItem('username')

    axios.post( url, {
        "token": token
      }
    ).then((response) => {
        //Set local storage token
        localStorage.setItem('access_token', response.data.accessToken)
        localStorage.setItem('refresh_token', response.data.refreshToken)
        localStorage.setItem('expires', response.data.expires)
        localStorage.setItem('username', username)

        //Set logged in to true
        dispatch({type: "USER_FETCH_LOGIN_FULFILLED", payload: username})
      })
      .catch((err) => {
        //Set error
        dispatch({type: "USER_FETCH_LOGIN_REJECTED", payload: err})
      })
  }
}

export function setLoggedIn(){
  //Set loggedIn state to true
  return {type: "ALREADY_LOGGED_IN"}
}

export function logout(){
  return function(dispatch) {
    //Delete localStorage entries
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires')
    localStorage.removeItem('username')

    //Clear exercises array
    dispatch(clearExercises())

    //Set logged in to false
    return {type: "USER_LOGOUT"}
  }
}
