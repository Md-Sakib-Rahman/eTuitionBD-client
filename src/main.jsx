import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './Routes/routes';
import ThemeContextProvider from './Context/ThemeContextProvide';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
    <RouterProvider router={router} />
    </ThemeContextProvider>
  </StrictMode>,
)
