import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'
import { MovieProvider } from './context/moviesContext.tsx'
import { MyListProvider } from './context/myListContext.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <MyListProvider>
            <App />
          </MyListProvider>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
