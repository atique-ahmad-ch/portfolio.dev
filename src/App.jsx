import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GitMeChat from './components/GitMeChat';
import Footer from './components/Footer';

// Auto logout & clean user data, cache etc
// reloading the site will auto-login again.
const IDLE_WIPE_MINUTES = 6 * 60;

const LoginPage = lazy(() => import('./pages/LoginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const PageLoader = () => (
  <div className="min-h-screen bg-github-bg flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-github-text-secondary/30 border-t-github-text-secondary rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [contributionData, setContributionData] = useState(null);
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);

  // --- Automatic Login ---
  useEffect(() => {
    const autoUsername = import.meta.env.VITE_GITHUB_USERNAME;
    const autoToken = import.meta.env.VITE_GITHUB_TOKEN;
    if (!autoUsername || !autoToken || data || isAutoLoggingIn) return;

    setIsAutoLoggingIn(true);
    handleLogin(autoUsername, autoToken)
      .catch(() => {

      })
      .finally(() => setIsAutoLoggingIn(false));
  }, []);



  // --- Fetch contribution calendar for a given year (PARALLEL) ---
  const fetchContributionCalendar = async (ghToken, loginName, years) => {
    const calendars = {};

    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const periods = [
      { id: 'Last Year', from: lastYear.toISOString(), to: today.toISOString() },
      ...years.map(y => ({
        id: y.toString(),
        from: `${y}-01-01T00:00:00Z`,
        to: `${y}-12-31T23:59:59Z`
      }))
    ];

    const fetchPeriod = async (period) => {
      const query = `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: { Authorization: `bearer ${ghToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables: { login: loginName, from: period.from, to: period.to } }),
        });
        const result = await response.json();
        if (result.data?.user?.contributionsCollection?.contributionCalendar) {
          return { id: period.id, calendar: result.data.user.contributionsCollection.contributionCalendar };
        }
      } catch (_err) {
        // Silent — a missing calendar year is a soft failure, not fatal.
      }
      return null;
    };

    const results = await Promise.all(periods.map(fetchPeriod));
    results.forEach(r => {
      if (r) calendars[r.id] = r.calendar;
    });

    return calendars;
  };

  const handleLogin = async (user, tok) => {
    try {
      setUsername(user);
      setToken(tok);

      const query = `
        query($login: String!) {
          user(login: $login) {
            name
            login
            bio
            avatarUrl
            url
            company
            location
            websiteUrl
            followers { totalCount }
            following { totalCount }
            contributionsCollection {
              contributionYears
            }
            pullRequests(last: 50, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                title url state createdAt
                repository {
                  nameWithOwner
                  primaryLanguage { name color }
                  licenseInfo { name spdxId }
                }
              }
            }
            issues(last: 50, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                title url state createdAt
                repository {
                  nameWithOwner
                  primaryLanguage { name color }
                  licenseInfo { name spdxId }
                }
              }
            }
            repositoryDiscussions(last: 50) {
              nodes {
                title url createdAt
                repository {
                  nameWithOwner
                  primaryLanguage { name color }
                  licenseInfo { name spdxId }
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `bearer ${tok}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { login: user } }),
      });
      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);

      const userData = result.data.user;
      if (!userData) throw new Error("User not found");

      setData(userData);

      // Fetch contribution calendars for all years (up to last 5)
      const allYears = userData.contributionsCollection?.contributionYears || [new Date().getFullYear()];
      const yearsToFetch = allYears.slice(0, 5);
      const calendars = await fetchContributionCalendar(tok, user, yearsToFetch);
      setContributionData({ years: yearsToFetch, calendar: calendars });
    } catch (err) {
      // Do NOT log err here — some GitHub error responses echo request
      // metadata that includes the token. Rethrow with a scrubbed message.
      throw new Error(err?.message || 'Sign-in failed. Check your credentials and try again.');
    }
  };

  const handleLogout = useCallback(() => {
    setData(null);
    setToken('');
    setUsername('');
    setContributionData(null);
  }, []);

  // --- Idle-timeout token wipe -------------------------------------------
  // Reset a timer on any user interaction. If IDLE_WIPE_MINUTES elapse
  // with no interaction, clear all auth state. Keeps the token from
  // living in memory on an unattended tab.
  const idleTimerRef = useRef(null);
  useEffect(() => {
    if (!token) return;

    const reset = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(
        handleLogout,
        IDLE_WIPE_MINUTES * 60 * 1000
      );
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'visibilitychange'];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [token, handleLogout]);

  // Also wipe on `beforeunload` — belt-and-braces since React state dies
  // with the tab anyway, but this covers same-origin navigations.
  useEffect(() => {
    const wipe = () => {
      setToken('');
      setUsername('');
      setData(null);
      setContributionData(null);
    };
    window.addEventListener('beforeunload', wipe);
    return () => window.removeEventListener('beforeunload', wipe);
  }, []);

  return (
    <BrowserRouter basename="/portfolio.dev">
      <div className="min-h-screen bg-github-bg text-github-text flex flex-col">
        {data && (
          <Navbar
            data={data}
            username={username}
            onLogout={handleLogout}
          />
        )}

        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  data ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <LoginPage onLogin={handleLogin} autoLoggingIn={isAutoLoggingIn} />
                  )
                }
              />
              <Route
                path="/home"
                element={
                  data ? (
                    <HomePage
                      data={data}
                      username={username}
                      token={token}
                      contributionData={contributionData}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  data ? <ProfilePage data={data} /> : <Navigate to="/" replace />
                }
              />
            </Routes>
          </Suspense>
        </main>

        {data && <Footer />}

        {/* Global Floating AI Chatbot */}
        {data && <GitMeChat data={data} />}
      </div>
    </BrowserRouter >
  );
};

export default App;