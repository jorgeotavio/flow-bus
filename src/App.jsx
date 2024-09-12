import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home'
import Stops from './pages/Stops';
import About from './pages/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <div>Teste</div>
  },
  {
    path: "/bus-stops",
    element: <Stops />,
  },
  {
    path: "/about",
    element: <About />,
  }
], {
  basename: '/flowbus/'
});

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
