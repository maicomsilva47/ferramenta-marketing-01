
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Remove duplicate import of Toaster from sonner since we already have it in App.tsx

createRoot(document.getElementById("root")!).render(
  <App />
);
