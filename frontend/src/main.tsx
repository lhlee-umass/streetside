import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App'
import Home from './pages/Home'
import NotFoundPage from './pages/404NotFound'
import { pages } from './utils/pages'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          {pages.map((page) => (
            <Route key={page.name} path={page.href} element={page.element} />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
