import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import MessagesPage from "./pages/MessagesPage"
import { Route, Routes, BrowserRouter } from 'react-router'
import './App.css'

function App() {

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/messages" element ={<MessagesPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
