import React, {useMemo, useState, useRef, useEffect } from 'react'
import './student.css'

const Student = (props, ref) => {
    const [expandView, setExpandView] = useState(false)
    const [containerHeight, setContainerHeight] = useState(0)
    const [tags, setTags] = useState([])
    const [input, setInput] = useState('')
    const testScoresRef = useRef()
    const {firstName, lastName, email, pic, grades, company, skill, updateTags} = props
    const fullName = firstName.concat(' ', lastName)

    const getAverage = (grades) => {
        let total = grades.reduce((a, b) => Number(a) + Number(b), 0)
        let avg = (total / grades.length).toFixed(3)
        return  avg
    }

    const average = useMemo(()=>{
      return getAverage(grades)
    },[grades])

    const handleToggle = (e) => {
      setExpandView((prevState) => {
        return !prevState
      })
    }

    useEffect(()=> {
      const testScoresHeight = testScoresRef.current.getBoundingClientRect().height
      if (expandView) {
        setContainerHeight(testScoresHeight)
      } else {
        setContainerHeight(0)
      }
    },[expandView])

    const handleKeyPress = (e) => {    
      if (e.key === 'Enter') {
        setTags([...tags,input])
        updateTags(firstName.concat(lastName),input)
        setInput('')
      }
    }

  const handleOnChange = (e) => {
    const value = e.target.value.toLowerCase()
    setInput(value)
  }

  return (
    <article className="student-root">
    <div className="student-container">
      <div className="image-div">
          <img src={pic} alt=""/>
      </div>
      <div className="text-div">
          <div className="fullname-div">
              <h1>{fullName.toUpperCase()}</h1>
              <button onClick={handleToggle} ><i className={!expandView ? `fa fa-plus` : `fa fa-minus`}></i> </button>
          </div>
          <div className="text-details-div">
              <p>Email: {email}</p>
              <p>Company: {company}</p>
              <p>Skill: {skill}</p>
              <p>Average: {average}%</p>
              <div className="tags">
                  {tags.map(tag => {
                        return (     
                            <button key={Math.random()} >{tag}</button>              
                        )
                    })}
              </div>
              <input value={input} onChange={handleOnChange} placeholder="Add a tag" onKeyPress={handleKeyPress} type="text" />
              <section style={{height:`${containerHeight}px`}} className="test-scores-section">
                <div ref={testScoresRef} className="test-results">
                  {grades.map((grade, index) => {
                    return (
                      <p key={index} >Test {++index}: {grade}%</p>
                    )
                  })}
                </div>
              </section>
          </div>
      </div>
    </div>
    <hr/>
    </article>
  )
 }

export default React.memo(Student)
