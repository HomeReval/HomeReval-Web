import axios from "axios"
import {history} from "../helpers/history"
import { getExercises } from './exerciseActions'

//User login action
export function login(username, password) {
  return function(dispatch) {
    dispatch({type: "USER_FETCH_LOGIN"})

    let url = "http://136.144.132.176:5000/api/user/login";

    axios.post( url, {
        "username":username,
        "password":password
      }
    ).then((response) => {
        //Set local storage token
        localStorage.setItem('access_token', response.data.accessToken)
        localStorage.setItem('refresh_token', response.data.refreshToken)
        localStorage.setItem('expires', response.data.expires)
        localStorage.setItem('username', username)

        //Set logged in to true
        dispatch({type: "USER_FETCH_LOGIN_FULFILLED", payload: username})

        history.push('/')

        dispatch(getExercises())

        //dispatch({type: "DISPLAY_SUCCESS_ALERT",payload: "Logged in!"})
      })
      .catch((err) => {
        dispatch({type: "USER_FETCH_LOGIN_REJECTED", payload: err})

        //dispatch({type: "DISPLAY_ERROR_ALERT",payload: "Gebruikersnaam of wachtwoord is niet juist!"})
      })
  }
}

export function refreshLogin(){
  return function(dispatch) {
    dispatch({type: "USER_FETCH_LOGIN"})

    let url = "http://136.144.132.176:5000/api/user/token/refresh";
    let token = localStorage.getItem('refresh_token')
    let username = localStorage.getItem('username')

    axios.post( url, {
        "token": token
      }
    ).then((response) => {
        console.log("response:");
        console.log(response);
        //Set local storage token
        localStorage.setItem('access_token', response.data.accessToken)
        localStorage.setItem('refresh_token', response.data.refreshToken)
        localStorage.setItem('expires', response.data.expires)
        localStorage.setItem('username', username)

        //Set logged in to true
        dispatch({type: "USER_FETCH_LOGIN_FULFILLED", payload: username})
      })
      .catch((err) => {
        dispatch({type: "USER_FETCH_LOGIN_REJECTED", payload: err})
      })
  }
}

export function setLoggedIn(){
  return {type: "ALREADY_LOGGED_IN"}
}

export function logout(){
  //Delete localStorage entries
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('expires')
  localStorage.removeItem('username')

  //Set logged in to false
  return {type: "USER_LOGOUT"}
}
