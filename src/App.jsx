import { useState } from 'react'
import Card from './components/Card'
import { useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import AddMovie from './pages/AddMovie';
import Landing from './pages/Landing';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/'>
      <Route index element={<Landing />} />
    </Route>
    <Route path='/addmovie' element={<AddMovie />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App
