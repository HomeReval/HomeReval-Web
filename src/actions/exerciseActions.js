import axios from "axios"
import {history} from "../helpers/history"

export function getExercises(){
  return {
    type: "GET_EXERCISE"
  }
}
