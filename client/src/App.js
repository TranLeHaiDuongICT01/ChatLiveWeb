import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat/Chat.jsx'
import Join from './components/Join/Join.jsx'
const App = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Join} element={<Join /> } />
        <Route path="/chat" element={<Chat location={props.location} />} component={Chat} />
      </Routes>
    </Router>
  )
}

export default App;
