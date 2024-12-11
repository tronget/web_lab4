import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignUpPage'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <div className="App">
		<Router>
			<Routes>
				<Route path='/' element={<LoginPage/>} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path = "/dashboard" element={<Dashboard />}/>
			</Routes>
		</Router>
	  </div>
    </>
  )
}

export default App
