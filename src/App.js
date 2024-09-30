import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/login';
import { useAuth } from './context/Authcontext';

function App() {
  const { isAuthenticated } = useAuth();
  const route = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <Home /> : <Login />
    }
  ])
  return (
    <RouterProvider router={route} />
  );
}

export default App;
