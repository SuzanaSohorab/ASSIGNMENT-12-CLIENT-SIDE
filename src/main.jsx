import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import { router } from './Router/Router';
import AuthProvider from './Contexts/AuthContext/AuthProvider';

// ✅ Import React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ✅ Create a new query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ Wrap inside QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
