import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'  // Importing React Router components for navigation
import AuthPage from './Auth'  // Import the AuthPage component for login and signup

// Define the AuthNavigator component as a functional component
const AuthNavigator: React.FC = () => {
  return (
    // Router component that enables routing for the app
    <Router>
      {/* Main container for the layout, applying full width and height with center alignment */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6 text-white">
        
        {/* Heading (not currently used) */}
        <h1 className="text-4xl font-bold mb-6"></h1>

        {/* Navigation links for login and signup */}
        <nav className="mb-6">
          {/* Link to the Login page, styled with Tailwind CSS */}
          <Link to="/login" className="text-blue-400 hover:underline mx-2">
            Login
          </Link>
          
          {/* Link to the Sign Up page, styled with Tailwind CSS */}
          <Link to="/signup" className="text-blue-400 hover:underline mx-2">
            Sign Up
          </Link>
        </nav>

        {/* Routes configuration to handle different paths */}
        <Routes>
          {/* When the path is '/login', render the AuthPage component */}
          <Route path="/login" element={<AuthPage />} />
          
          {/* When the path is '/signup', render the AuthPage component */}
          <Route path="/signup" element={<AuthPage />} />
          
          {/* Default route (wildcard), renders the AuthPage component for any undefined route */}
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  )
}

// Export the AuthNavigator component so it can be used in other parts of the app
export default AuthNavigator
