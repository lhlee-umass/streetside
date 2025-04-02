import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import AuthPage from './Auth'

const AuthNavigator: React.FC = () => {
  return (
    <Router>
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6 text-white">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Streetside Marketplace
        </h1>
        <nav className="mb-6">
          <Link to="/login" className="text-blue-400 hover:underline mx-2">
            Login
          </Link>
          <Link to="/signup" className="text-blue-400 hover:underline mx-2">
            Sign Up
          </Link>
        </nav>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default AuthNavigator
