import { useNavigate } from 'react-router'
import React, { useState } from 'react'
import { signInWithGoogle } from '../firebase' 


const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError(null)
    setSuccess(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.confirmPassword)
    ) {
      setError('All fields are required.')
      return
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSuccess(
      isLogin
        ? 'Login successful! Logging you in...'
        : 'Sign up successful! Logging you in...'
    )
    console.log(isLogin ? 'Logging in...' : 'Signing up...')

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 text-white border border-gray-300 rounded-lg"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 text-white border border-gray-300 rounded-lg"
            placeholder="Password"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 text-white border border-gray-300 rounded-lg"
              placeholder="Confirm Password"
              required
            />
          )}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Google Auth Button */}
        <div className="mt-6">
          <button
              onClick={async () => {
                try {
                  const result = await signInWithGoogle()
                  console.log('User:', result.user)
                  navigate('/') // redirect on success
                } catch (error) {
                  console.error('Google login error:', error)
                  setError('Failed to login with Google.')
                }
              }}
            className="w-full p-3 border border-gray-300 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C33.4 33.4 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l6-6C34.5 5.2 29.5 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.5 0 20.3-7.7 20.3-21 0-1.1-.1-2.1-.3-3.1z"
              />
              <path
                fill="#e53935" d="M6.3 14.7l6.6 4.8C14.1 15.5 18.7 13 24 13c3.1 0 5.9 1.2 8.1 3.1l6-6C34.5 5.2 29.5 3 24 3c-7.5 0-14 4.1-17.7 10.3z"
              />
              <path
                fill="#4caf50" d="M24 45c5.1 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.1 36 24 36 19.3 32.5l-6.4 4.9C13.9 42.1 18.6 45 24 45z"
              />
              <path
                fill="#1565c0" d="M43.6 20.5H42V20H24v8h11.3C34.4 32.5 29.1 36 24 36c-4.7 0-8.8-2.8-10.7-6.8l-6.6 5.1C11.7 41 17.4 45 24 45c10.5 0 20.3-7.7 20.3-21 0-1.1-.1-2.1-.3-3.1z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
              setSuccess(null)
            }}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
