const defaultState = {
  exercises: [
    { id: 1,
      exerciseResults: [
        {score: 87}
      ]
    },
    { id: 2,
      exerciseResults: [
        {score: 74}
      ]
    },
    { id: 3,
      exerciseResults: [
        {score: 32}
      ]
    },
    { id: 4,
      exerciseResults: [
        {score: 8}
      ]
    }
    ,
    { id: 5,
      exerciseResults: [
        {score: 56}
      ]
    }
  ]
}

export default function reducer(state=defaultState, action) {
  switch (action.type) {
    case "GET_EXERCISES":{
      return {
        ...state
      }
    }
    default:{
      return state
    }
  }
}
