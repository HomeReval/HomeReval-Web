const defaultState = {
    alert: false,
    message: '',
}

export default function reducer( state=defaultState, action ) {

    switch ( action.type ) {
      case 'DISPLAY_SUCCESS_ALERT': {
        return {
          ...state,
          alert: true,
          message: action.payload,
        }
      }
      case 'DISPLAY_ERROR_ALERT': {
        return {
          ...state,
          alert: true,
          message: action.payload,
        }
      }

      case 'END_ALERT': {
        return {
          ...state,
          alert: false,
          message: '',
        }
      }
      default: {
        return state
      }
    }
}
