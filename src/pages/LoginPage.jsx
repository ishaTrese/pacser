import { useState } from "react"
import { Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async () => {
    setError("")
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
      
      {/* Left side - Logo */}
      <div className="hidden lg:flex items-center justify-center w-[420px] mr-8">
        <div className="bg-white rounded-2xl p-10 w-72 h-72 flex items-center justify-center shadow-2xl">
          <img src="/src/assets/chq-logo.png" alt="CHQ Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Right side - Login card */}
      <div className="w-full max-w-[540px]">
        <div className="border border-[#EAB308] rounded-2xl p-10 bg-[#1a2235]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Welcome Back, User!</h1>
            <p className="text-gray-400 text-sm">Sign in to continue your learning journey</p>
          </div>

          {/* Email field */}
          <div className="mb-5">
            <label className="text-white font-semibold text-sm mb-2 block">
              Email Address
            </label>
            <div className="flex items-center bg-[#243044] rounded-xl px-4 py-3 gap-3">
              <Mail className="text-gray-400 w-5 h-5 shrink-0" />
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white placeholder-gray-500 text-sm outline-none w-full"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-5">
            <label className="text-white font-semibold text-sm mb-2 block">
              Password
            </label>
            <div className="flex items-center bg-[#243044] rounded-xl px-4 py-3 gap-3">
              <Lock className="text-gray-400 w-5 h-5 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white placeholder-gray-500 text-sm outline-none w-full"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-300 text-xs shrink-0"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                  rememberMe ? "border-[#EAB308] bg-[#EAB308]" : "border-gray-500"
                }`}
              />
              <span className="text-gray-400 text-sm">Remember me</span>
            </label>
            <button className="text-[#EAB308] text-sm hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          {/* Sign in button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#EAB308] hover:bg-[#ca9a07] transition-colors text-black font-bold text-lg py-4 rounded-xl mb-6 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: 'http://localhost:5173/dashboard'
                  }
                })
              }}
              className="bg-[#243044] hover:bg-[#2d3c54] transition-colors text-white font-semibold py-3 rounded-xl text-sm"
            >
              Google
            </button>
            <button className="bg-[#243044] hover:bg-[#2d3c54] transition-colors text-white font-semibold py-3 rounded-xl text-sm">
              Facebook
            </button>
          </div>

          {/* Create account */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <button className="text-[#EAB308] font-semibold hover:underline">
              Create one now
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-gray-500 text-xs mt-4">
          By signing in, you agree to our{" "}
          <span className="text-[#EAB308] cursor-pointer hover:underline">Terms of Service</span>
          {" "}and{" "}
          <span className="text-[#EAB308] cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}