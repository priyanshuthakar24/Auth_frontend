import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { RootLayout, Shop, About, Stories, } from './pages/index'
import { Profile, Wishlist, Order } from './pages/ProfileMenu/index'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import VerifyEmail from './components/auth/VerifyEmail';
import { useAuth } from './context/Authcontext';

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
  const { isAuthenticated } = useAuth();
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
      ]
    },
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
