import { useNavigate } from 'react-router'  // Importing React Router's navigate function for navigation
import React, { useState } from 'react'  // Importing React and useState for managing state in the component
import { Auth } from '../api/api'  // Import the Auth API for handling login and signup functionality

// Define the AuthPage component as a functional component
const AuthPage: React.FC = () => {
  // State variables to manage login/signup form states
  const [isLogin, setIsLogin] = useState(true)  // Boolean state to determine if it's login or signup
  const [formData, setFormData] = useState({
    email: '',  // Store email input value
    password: '',  // Store password input value
    confirmPassword: '',  // Store confirm password input value (only for signup)
  })
  const [error, setError] = useState<string | null>(null)  // State for any error messages
  const [success, setSuccess] = useState<string | null>(null)  // State for success messages after login/signup

  // useNavigate hook to programmatically navigate to another route after login/signup
  const navigate = useNavigate()

  // Handle changes in input fields and update formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })  // Update specific form field value
    setError(null)  // Reset error message on input change
    setSuccess(null)  // Reset success message on input change
  }

  // Handle form submission (either for login or signup)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  // Prevent default form submission behavior
    setError(null)  // Reset any error messages before form validation
    setSuccess(null)  // Reset success messages before form validation

    // Validation: Ensure all fields are filled
    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.confirmPassword)  // Ensure confirmPassword is provided only for signup
    ) {
      setError('All fields are required.')  // Set error if any field is missing
      return
    }

    // Validation: Ensure passwords match during signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')  // Set error if passwords don't match during signup
      return
    }

    // If it's a login attempt, authenticate the user
    if (isLogin) {
      Auth.login(formData.email).then((user) => {
        if (!user) {
          setError('User not found.')  // Show error if user is not found
          return
        }
        setSuccess('Login successful! Logging you in...')  // Show success message on successful login
        setTimeout(() => {
          navigate('/')  // Navigate to the homepage after a successful login
        }, 1000)  // 1 second delay before redirecting
      })
      return
    }

    // If it's a signup attempt, show success message (for now, just simulate success)
    setSuccess(
      isLogin
        ? 'Login successful! Logging you in...'
        : 'Sign up successful! Logging you in...'
    )
    console.log(isLogin ? 'Logging in...' : 'Signing up...')  // Log the action in the console (for debugging)
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 p-6">
      {/* Main form container with background and padding */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        {/* Heading (Login/Sign Up title) */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}  {/* Display either 'Login' or 'Sign Up' based on isLogin state */}
        </h2>

        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Display success message if any */}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        {/* Form for email, password, and confirmPassword fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}  // Call handleChange to update formData
            className="w-full p-3 text-white border border-gray-300 rounded-lg"
            placeholder="Email"
            required
          />
          
          {/* Password input */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}  // Call handleChange to update formData
            className="w-full p-3 text-white border border-gray-300 rounded-lg"
            placeholder="Password"
            required
          />
          
          {/* Confirm Password input (only visible for Sign Up mode) */}
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}  // Call handleChange to update formData
              className="w-full p-3 text-white border border-gray-300 rounded-lg"
              placeholder="Confirm Password"
              required
            />
          )}

          {/* Submit button (either 'Login' or 'Sign Up' depending on state) */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)  // Toggle between login and signup forms
              setError(null)  // Reset error message
              setSuccess(null)  // Reset success message
            }}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}  {/* Toggle button text */}
          </button>
        </p>
      </div>
    </div>
  )
}

// Export the AuthPage component so it can be used in other parts of the app
export default AuthPage
