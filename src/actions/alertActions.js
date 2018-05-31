export function successAlertAction( message ){
  return {
    type: 'DISPLAY_SUCCESS_ALERT',
    payload: message
  }
}

export function errorAlertAction( message ){
  return {
    type: 'DISPLAY_ERROR_ALERT',
    payload: message
  }
}

export function hideAlertAction(){
  return {
    type: 'END_ALERT'
  }
}
