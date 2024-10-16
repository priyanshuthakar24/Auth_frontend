import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RootLayout, Shop, About, Stories, } from './pages/index'
import { Profile, Wishlist, Order } from './pages/ProfileMenu/index'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import VerifyEmail from './components/auth/VerifyEmail';
import { useAuth } from './context/Authcontext';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPassword from './components/auth/ResetPassword';

//!  This method check that user is authenticated or not also check that user is Verified or not if not than it will redired to login or verify-email page 
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userData } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />
  }
  if (!userData.isVerified) {
    return <Navigate to='/auth/verify-email' replace />
  }
  return children;
}

//! This method is for the redirection if user is authenticated but not verify that it will redirect to verify-email also if the user is authenticated and user is verified that it will redirect to home  '/' page than login and signup are not accesable 

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, userData } = useAuth();
  if (isAuthenticated && !userData.isVerified) {
    return <Navigate to='/auth/verify-email' />
  }
  if (isAuthenticated && userData.isVerified) {
    return <Navigate to='/' replace />
  }
  return children;
}


function App() {

  const route = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: 'shop',
          element: <Shop />
        }, {
          path: 'stories',
          element: <Stories />
        },
        {
          path: 'shop',
          element: <Shop />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'profile',
          element: <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        },
        {
          path: 'wishlist',
          element: <ProtectedRoute><Wishlist /></ProtectedRoute>
        },
        {
          path: 'orders',
          element: <ProtectedRoute><Order /></ProtectedRoute>
        },
        {
          path: 'auth/login',
          element: <RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser >,
        },
        {
          path: 'auth/signup',
          element: <RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>,
        },
        {
          path: 'auth/verify-email',
          element: <VerifyEmail />
        },
        {
          path: 'auth/forgot-password',
          element: <RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>
        },
        {
          path: 'auth/reset-password/:token',
          element: <RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser>
        }
      ]
    },
    //! if any route that is not on the above roues than it will redirect to '/' route:- Universel route 
    {
      path: "*",
      element: <Navigate to='/' replace />,
    },
  ])
  return (
    <RouterProvider router={route} />
  );
}

export default App;
