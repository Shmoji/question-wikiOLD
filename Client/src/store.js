import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers" // Imports from index.js inside reducers folder

const initialState = {}

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
]

const store = createStore(
  rootReducer,
  initialState,
  compose(...middleware)
)

export default store