import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../../../redux/students/list/reducer'
import Student from '../../../components/student/student'
import Loader from '../../../components/loader/loader'
import './students.css'

function StudentsList() {
    const { students, loading, studentsError } = useSelector(state => state.studentsList)
    const [searchTerms, setSearchTerms] = useState({name:'',tag:''})
    const dispatch = useDispatch();
    const [tags,setTags] = useState({})

    useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    const updateTags = (k,value) => {
        let newTags = {...tags}
            if (newTags[k]) {
                const existingTags = newTags[k]
                setTags({...tags, [k]:[...existingTags, value] })
            } else {
                setTags((prevState) => {
                    return {...prevState, [k]:[value]}
                })
            }

    }
    // returning a memoized callback to
    // avoid needless renderings of Student component due to referential equality
    const updateTagsCB = useCallback((key,value)=>{
        updateTags(key,value)
    },[])

    const studentsList = () => {
        let tagMatches = []
        if (Object.keys(tags).length > 0) {
            for (const k in tags) {
                tags[k].join('').includes(searchTerms.tag.toLowerCase()) && tagMatches.push(k)
                }
        }

        const searchResults = students.filter(({firstName, lastName}) => {
            const fullName = firstName.concat(lastName)
                if (searchTerms.tag === '' || Object.keys(tags).length === 0) {
                    return fullName.toLowerCase()
                                    .includes(searchTerms.name.toLowerCase())
                } else if (searchTerms.tag !== '' && Object.keys(tags).length === 0){
                    return fullName.toLowerCase()
                        .includes(searchTerms.name.toLowerCase())
                } else {
                    return fullName.toLowerCase()
                                    .includes(searchTerms.name.toLowerCase()) && (
                                        tagMatches.includes(fullName)
                                                          )
                }
            })
            return searchResults
    }


    const handleChange= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSearchTerms({ ...searchTerms, [name]: value });
    }

     return (
        <section className="students-container">
            {students.length > 0 && (
                    <form>
                        <input className="search-input" name="name" value={searchTerms.name} placeholder="Search by name" type="text" onChange={handleChange}/>
                        <input className="search-input" name="tag" value={searchTerms.tag} placeholder="Search by tag" type="text" onChange={handleChange}/>
                    </form>
                )
            }
            {loading ? <Loader loading={loading} /> : studentsError ? <h2>{studentsError}</h2> :
                studentsList().map((student) => {
                    return (
                        <Student updateTags={updateTagsCB} key={student.id} {...student} />
                    )
                })}
        </section>
    )
}

export default StudentsList
