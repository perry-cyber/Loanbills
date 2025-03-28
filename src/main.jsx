import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FolderRoute from './routes/route.jsx'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./toastify.css"
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
      <FolderRoute />
      <ToastContainer />
    </BrowserRouter>
    {import.meta.env.DEV && (
      <ReactQueryDevtools initialIsOpen={true} />
    )}
    </QueryClientProvider>
  </React.StrictMode>,
)