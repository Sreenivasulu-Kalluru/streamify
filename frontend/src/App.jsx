import { Route, Routes } from 'react-router';

import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Home from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Notifications from './pages/Notifications.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { axiosInstance } from './lib/axios.js';

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todo'],

    queryFn: async () => {
      const res = await axiosInstance.get('http://localhost:5001/api/auth/me');
      return res.data;
    },
  });

  console.log(data);
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
