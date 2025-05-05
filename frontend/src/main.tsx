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
import ViewProfile from './pages/profile/ViewProfile'
// import EditProfile from './pages/profile/EditProfile'
import MessageList from './pages/MessageList'
import ListingDetailsPage from './pages/ListingDetailsPage'

getDB() // Initialize local database


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
          <Route path="/messages" element={<MessageList />} />
          <Route path="/listing/:id" element={<ListingDetailsPage />} />
          <Route path="/message-seller" element={<MessageSellerPage />}>
            <Route index element={<MessageSellerPage />} />
          </Route>
          <Route path="/profile">
            <Route index element={<ViewProfile />} />
            <Route path=":id" element={<ViewProfile />} />
            {/* <Route path="edit" element={<EditProfile />} /> */}
          </Route>
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
