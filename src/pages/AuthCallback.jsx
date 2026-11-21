import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

/**
 * OAuth Callback Page
 * Backend redirects here after Google/GitHub login with token in query params.
 * This page stores the token + user data and redirects to dashboard.
 */
const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Sign-in failed. Please try again.');
      navigate('/login');
      return;
    }

    if (!token) {
      toast.error('Authentication failed — no token received.');
      navigate('/login');
      return;
    }

    // Build user object from query params
    const user = {
      id: searchParams.get('userId'),
      name: decodeURIComponent(searchParams.get('name') || ''),
      email: decodeURIComponent(searchParams.get('email') || ''),
      avatar: decodeURIComponent(searchParams.get('avatar') || '') || null,
      provider: searchParams.get('provider') || 'local',
    };

    handleOAuthCallback(token, user);
    toast.success(`Welcome, ${user.name}! 🎉`);
    navigate('/dashboard');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Signing you in...</h2>
        <p className="text-gray-400">Just a moment, setting up your workspace</p>
        <div className="flex justify-center gap-1 pt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
