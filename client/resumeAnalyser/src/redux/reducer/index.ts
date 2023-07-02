import { combineReducers } from 'redux'
import commonReducer from './common.reducer'
import userReducer from './user.reducer'
import resumeReducer from './resume.reducer'


const rootReducer = combineReducers({
  common: commonReducer,
  user: userReducer,
  resume: resumeReducer
})

export default rootReducer