import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Students from './views/students/list/students'


function App() {
  return (
    <Router>
        <div className='App' >
        <Switch>
          <Route path="/" exact ><Students/></Route>
        </Switch>
        </div>
    </Router>
  )
}

export default App
