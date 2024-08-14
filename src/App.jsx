import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home'
import Stops from './pages/Stops';

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
    path: "/bus-stops/:stopId",
    element: <Stops />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
