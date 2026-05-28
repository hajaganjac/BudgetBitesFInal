import React, { useState, useCallback, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider } from './context/AppContext';
import { LogoutProvider } from './context/LogoutContext';
import { LoginScreen } from './pages/LoginScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';

const SESSION_KEY = 'budgetbites_session';

interface Session {
  name: string;
  emoji: string;
  email: string;
}

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(s: Session, persistent: boolean) {
  const json = JSON.stringify(s);
  if (persistent) {
    localStorage.setItem(SESSION_KEY, json);
    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(SESSION_KEY, json);
    localStorage.removeItem(SESSION_KEY);
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export default function App() {
  const [isLoggedIn,   setIsLoggedIn]   = useState(false);
  const [initialName,  setInitialName]  = useState('Student');
  const [initialEmoji, setInitialEmoji] = useState('👨‍🎓');
  const [userKey,      setUserKey]      = useState<string>('guest');
  const [isReturning,  setIsReturning]  = useState(false);

  useEffect(() => {
    const session = readSession();
    if (session) {
      setInitialName(session.name);
      setInitialEmoji(session.emoji);
      setUserKey(session.email || session.name);
      setIsReturning(true);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = useCallback(
    (name: string, emoji: string, email: string, rememberMe: boolean) => {
      setInitialName(name);
      setInitialEmoji(emoji);
      setUserKey(email || name);
      setIsReturning(false);
      setIsLoggedIn(true);
      writeSession({ name, emoji, email }, rememberMe);
    },
    []
  );

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setInitialName('Student');
    setInitialEmoji('👨‍🎓');
    setIsReturning(false);
    clearSession();
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'fixed', inset: 0 }}
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            style={{ height: '100vh' }}
          >
            <LogoutProvider onLogout={handleLogout} isReturning={isReturning}>
              <AppProvider
                key={userKey}
                userKey={userKey}
                initialName={initialName}
                initialEmoji={initialEmoji}
              >
                <RouterProvider router={router} />
              </AppProvider>
            </LogoutProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}
