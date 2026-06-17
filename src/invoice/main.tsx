import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import InvoiceApp from './InvoiceApp.tsx';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InvoiceApp />
  </StrictMode>,
);
