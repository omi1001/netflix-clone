// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';

// Import Pages and Layouts
import App from './App.jsx'; // The main app layout (Navbar, Footer, Outlet)
import Homepage from './pages/Homepage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import TvShowsPage from './pages/TvShowsPage.jsx';
import MyListPage from './pages/MyListPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

// Import Contexts and Hooks
import { ListProvider } from './context/ListContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx'; // Import useAuth here

// Import Styles & AOS
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ duration: 1000, once: true });

// --- Protected Route Logic ---
// Checks auth and renders App (which includes Outlet) or redirects to Login
const ProtectedLayout = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <App />; // Renders the main layout containing Navbar, Footer, and Outlet
};

// --- Public Route Logic ---
// Redirects logged-in users away from Login/Signup
const PublicRouteRedirect = ({ children }) => {
    const { currentUser } = useAuth();
    if (currentUser) {
        return <Navigate to="/" replace />;
    }
    return children; // Show Login or Signup page
};

// --- Updated Router Configuration ---
const router = createBrowserRouter([
  {
    // Protected Routes (require login)
    element: <ProtectedLayout />, // This element checks auth
    children: [
      // If auth passes, <App/> renders, and its <Outlet/> shows one of these:
      { path: '/', element: <Homepage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'tvshows', element: <TvShowsPage /> },
      { path: 'mylist', element: <MyListPage /> },
      { path: 'account', element: <AccountPage /> },
    ]
  },
  {
    // Public Routes (accessible without login)
    path: '/login',
    element: (
        <PublicRouteRedirect>
            <LoginPage />
        </PublicRouteRedirect>
    ),
  },
  {
    path: '/signup',
    element: (
        <PublicRouteRedirect>
            <SignupPage />
        </PublicRouteRedirect>
    ),
  },
  {
      // Catch-all redirects to login (if out) or home (if in)
      path: '*',
      element: <Navigate to="/" replace /> // ProtectedLayout will handle redirection if needed
  }
]);

// --- Render the App ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ListProvider>
        <RouterProvider router={router} />
      </ListProvider>
    </AuthProvider>
  </React.StrictMode>,
);