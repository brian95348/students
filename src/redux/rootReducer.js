import {combineReducers} from 'redux'
import studentsReducer from './students/list/reducer'

const rootReducer = combineReducers({
    studentsList: studentsReducer,
})

export default rootReducer