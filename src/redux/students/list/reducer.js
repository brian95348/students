import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    loading : false,
    students: [],
    studentsError: ''
}

const studentsReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.FETCH_STUDENTS_LIST_REQUEST:
            return {
                ...state,
                loading:true
            };
        case actionCreators.FETCH_STUDENTS_LIST_SUCCESS:
            return {
                ...state,
                loading:false,
                students:action.payload,
                studentsError:''
            };
        case actionCreators.FETCH_STUDENTS_LIST_FAILURE:
            return {
                ...state,
                loading:false,
                studentsError:action.payload,
                students:[]
            };
        default:
            return state;
    }
}

export const fetchStudents = () => async (dispatch) => {
    dispatch(actionCreators.fetchStudentsListRequest())
    try {
        const {data} = await axios.get(`https://api.hatchways.io/assessment/students`);
        dispatch(actionCreators.fetchStudentsListSuccess(data.students))
    } catch (error) {
        dispatch(actionCreators.fetchStudentsListFailure(error))
    }      
}

export default studentsReducer