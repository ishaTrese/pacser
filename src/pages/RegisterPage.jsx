import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('First and last name are required.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          display_name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        },
      },
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      navigate('/dashboard')
    } else {
      setError('Check your email to confirm your account before logging in.')
    }
  }

  return (
    <div className="h-screen bg-[#0d1117] flex items-center justify-center p-6 overflow-hidden">

      {/* Left side - Logo — identical to LoginPage */}
      <div className="hidden lg:flex items-center justify-center w-[420px] mr-8">
        <div className="bg-white rounded-xl p-10 w-72 h-72 flex items-center justify-center shadow-2xl">
          <img src="/src/assets/chq-logo.png" alt="CHQ Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Right side - identical card shell to LoginPage */}
      <div className="w-full max-w-[540px]">
        <div className="border border-[#EAB308] rounded-xl p-10 bg-[#1a2235] h-[600px] flex flex-col justify-center">

          {/* Header — smaller font to save space */}
          <div className="text-center mb-3">
            <h1 className="text-white text-xl font-bold mb-1">Create an Account</h1>
            <p className="text-gray-400 text-xs">Start your Civil Service journey today</p>
          </div>

          {/* First Name & Last Name */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="text-white font-semibold text-xs mb-1 block">First Name</label>
              <div className="flex items-center bg-[#243044] rounded-lg px-4 py-2 gap-3">
                <User className="text-gray-400 w-4 h-4 shrink-0" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="bg-transparent text-white placeholder-gray-500 text-xs outline-none w-full"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-white font-semibold text-xs mb-1 block">Last Name</label>
              <div className="flex items-center bg-[#243044] rounded-lg px-4 py-2 gap-3">
                <User className="text-gray-400 w-4 h-4 shrink-0" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="bg-transparent text-white placeholder-gray-500 text-xs outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-white font-semibold text-xs mb-1 block">Email Address</label>
            <div className="flex items-center bg-[#243044] rounded-lg px-4 py-2 gap-3">
              <Mail className="text-gray-400 w-4 h-4 shrink-0" />
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-transparent text-white placeholder-gray-500 text-xs outline-none w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-white font-semibold text-xs mb-1 block">Password</label>
            <div className="flex items-center bg-[#243044] rounded-lg px-4 py-2 gap-3">
              <Lock className="text-gray-400 w-4 h-4 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-transparent text-white placeholder-gray-500 text-xs outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-300 text-xs shrink-0"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="text-white font-semibold text-xs mb-1 block">Confirm Password</label>
            <div className="flex items-center bg-[#243044] rounded-lg px-4 py-2 gap-3">
              <Lock className="text-gray-400 w-4 h-4 shrink-0" />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="bg-transparent text-white placeholder-gray-500 text-xs outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-500 hover:text-gray-300 text-xs shrink-0"
              >
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-xs text-center mb-2">{error}</p>
          )}

          {/* Create Account button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-[#EAB308] hover:bg-[#ca9a07] transition-colors text-black font-bold text-base py-3 rounded-lg mb-3 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          {/* Google button */}
          <div className="mb-3">
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: 'http://localhost:5173/dashboard',
                    queryParams: { prompt: 'select_account' }
                  }
                })
              }}
              className="w-full bg-[#243044] hover:bg-[#2d3c54] transition-colors text-white font-semibold py-3 rounded-lg text-xs"
            >
              Google
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-gray-400 text-xs">
            Already have an account?{' '}
            <Link to="/" className="text-[#EAB308] font-semibold hover:underline">
              Log in
            </Link>
          </p>

        </div>

        {/* Terms */}
        <p className="text-center text-gray-500 text-xs mt-4">
          By signing up, you agree to our{' '}
          <span className="text-[#EAB308] cursor-pointer hover:underline">Terms of Service</span>
          {' '}and{' '}
          <span className="text-[#EAB308] cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}