import { useState } from 'react'
import Card from './components/Card'
import { useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import AddMovie from './pages/AddMovie';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/'>
      <Route index />
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
