import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2, Github } from 'lucide-react';

// Google SVG icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);
  const { register, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      toast.success('Welcome to DevTask AI! 🎉');
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.error?.message || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    setOauthLoading('google');
    loginWithGoogle();
  };

  const handleGithub = () => {
    setOauthLoading('github');
    loginWithGithub();
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Left Side — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">DevTask AI</h1>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-300">Start your AI-powered journey today</p>
            </div>

            {/* ─── Social Sign-Up ─────────────────────────────────────── */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogle}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all border border-gray-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {oauthLoading === 'google' ? (
                  <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                Sign up with Google
              </button>

              <button
                onClick={handleGithub}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all border border-gray-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {oauthLoading === 'github' ? (
                  <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Github className="w-5 h-5" />
                )}
                Sign up with GitHub
              </button>
            </div>

            {/* ─── Divider ───────────────────────────────────────────── */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 text-gray-400">or create account with email</span>
              </div>
            </div>

            {/* ─── Email/Password Form ───────────────────────────────── */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                    minLength={2}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Minimum 6 characters</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/50"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Right Side — Features */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-12 xl:px-20">
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">DevTask AI</h1>
          </div>
          <h2 className="text-5xl font-bold text-white leading-tight">
            Join Thousands of<br />
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Smart Developers
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Everything you need to manage projects, track tasks,
            and boost productivity with AI assistance.
          </p>
          <div className="space-y-4 pt-8">
            {[
              { title: 'AI Task Generation', desc: 'Let AI break down your projects into actionable tasks' },
              { title: 'Smart Code Snippets', desc: 'Save and organize your code with intelligent tagging' },
              { title: 'Developer Tools', desc: 'JSON formatter, regex tester, API client, and more' },
              { title: 'Bug Tracking', desc: 'Track and resolve issues efficiently with AI suggestions' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                  <p className="text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
