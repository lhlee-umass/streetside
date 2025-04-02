import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App'
import Home from './pages/Home'
import NotFoundPage from './pages/404NotFound'
import { pages } from './utils/pages'
import MessageSellerPage from './pages/MessageSellerPage'
import getDB from './api/localDB'
import Auth from './pages/Auth'

getDB()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          {pages.map((page) => (
            <Route key={page.name} path={page.href} element={page.element} />
          ))}
          <Route path="/login" element={<Auth />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/message-seller" element={<MessageSellerPage />}>
          <Route index element={<MessageSellerPage />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
