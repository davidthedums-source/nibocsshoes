import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept Google Maps auth failure and dispatch custom event
if (typeof window !== 'undefined') {
  (window as unknown as { gm_authFailure: () => void }).gm_authFailure = () => {
    window.dispatchEvent(new CustomEvent('gmp-auth-failure'));
  };
}

createRoot(document.getElementById('root')!).render(<App />);
