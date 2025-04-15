import './styles/app.css'
import { Routes, Route } from 'react-router-dom'
import { SearchProvider } from './context/contextSearch'
import PrivateRoutes from './components/privateRoutes'
import Register from './routes/Register'
import Login from './routes/login'
import Home from './routes/home'
import Navbar from './components/Navbar'
import Movie from './routes/movie'
import Profile from './routes/profile'

function App() {
  return (
    <>
    <div className='app'>
      <SearchProvider>
    <Navbar></Navbar>
    <Routes>
    <Route path="/" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route element={<PrivateRoutes />}>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/movie/:id" element={<Movie />}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Route>
    </Routes>
    </SearchProvider>
    </div>
    </>
  )
}

export default App
