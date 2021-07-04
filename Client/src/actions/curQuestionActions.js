import { SET_QUESTION_DATA, SET_SIMPLE_DATA, SET_SECTIONS_DATA,
  SET_ANSWERS_DATA, SET_DISCUSS_DATA, SET_EDITS_DATA,
  SET_HELP_DATA, CLEAR_QUESTION_DATA } from "./types";

export const clearQuestionData = () => {
  return {
    type: CLEAR_QUESTION_DATA,
  }
}

export const setQuestionData = (payload) => {
  return {
    type: SET_QUESTION_DATA,
    payload: payload
  };
};

export const setSimpleData = (payload) => {
  return {
    type: SET_SIMPLE_DATA,
    payload: payload
  };
};

export const setSectionsData = (payload) => {
  return {
    type: SET_SECTIONS_DATA,
    payload: payload
  };
};

export const setAnswersData = (payload) => {
  return {
    type: SET_ANSWERS_DATA,
    payload: payload
  };
};

export const setDiscussData = (payload) => {
  return {
    type: SET_DISCUSS_DATA,
    payload: payload
  };
};

export const setEditsData = (payload) => {
  return {
    type: SET_EDITS_DATA,
    payload: payload
  };
};

export const setHelpData = (payload) => {
  return {
    type: SET_HELP_DATA,
    payload: payload
  };
};