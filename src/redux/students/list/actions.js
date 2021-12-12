export const FETCH_STUDENTS_LIST_REQUEST = "FETCH_STUDENTS_LIST_REQUEST"
export const FETCH_STUDENTS_LIST_SUCCESS = "FETCH_STUDENTS_LIST_SUCCESS"
export const FETCH_STUDENTS_LIST_FAILURE = "FETCH_STUDENTS_LIST_FAILURE"

export const fetchStudentsListRequest = ()=>{
    return {
        type:FETCH_STUDENTS_LIST_REQUEST
    }
}

export const fetchStudentsListSuccess = (students)=>{
    return {
        type:FETCH_STUDENTS_LIST_SUCCESS,
        payload:students
    }
}

export const fetchStudentsListFailure = (err)=>{
    return {
        type:FETCH_STUDENTS_LIST_FAILURE,
        payload:err.response && err.response.data.message ? err.response.data.message : err.message
    }
}
