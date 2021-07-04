import { SET_QUESTION_DATA, SET_SIMPLE_DATA, SET_SECTIONS_DATA,
  SET_ANSWERS_DATA, SET_DISCUSS_DATA, SET_EDITS_DATA,
  SET_HELP_DATA, CLEAR_QUESTION_DATA } from "../actions/types";

const initialState = {
  questionData: {},
  simpleData: {},
  sectsData: [],
  answers: [],
  discussions: [],
  edits: [],
  help: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_QUESTION_DATA:
      return initialState;
    case SET_QUESTION_DATA:
      return { ...state, questionData: action.payload }
    case SET_SIMPLE_DATA:
      return { ...state, simpleData: action.payload }
    case SET_SECTIONS_DATA:
      return { ...state, sectsData: action.payload }
    case SET_ANSWERS_DATA:
      return { ...state, answers: action.payload }
    case SET_DISCUSS_DATA:
      return { ...state, discussions: action.payload }
    case SET_EDITS_DATA:
      return { ...state, edits: action.payload }
    case SET_HELP_DATA:
      return { ...state, help: action.payload }

    default:
      return state;
  }
}