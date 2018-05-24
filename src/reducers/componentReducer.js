const defaultState = {
  drawerVariant: 'permanent',
}

export default function reducer(state=defaultState, action) {
  switch (action.type) {
    case "SHOW_DRAWER": {
      return {
        ...state,
        drawerVariant: 'permanent'
      }
    }
    case "HIDE_DRAWER": {
      return {
        ...state,
        drawerVariant: 'temporary'
      }
    }
    default: {
      return state
    }
  }
}
