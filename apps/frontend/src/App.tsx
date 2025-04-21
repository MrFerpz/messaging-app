import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import MessagesPage from "./pages/MessagesPage"
import { Route, Routes, BrowserRouter } from 'react-router'
import { Provider } from "./components/ui/provider"
import './App.css'
import SignupPage from "./pages/SignupPage"

function App() {

  return (
    <Provider>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/messages" element ={<MessagesPage/>}/>
          </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
