// src/components/DynamicRouter.tsx
import { BrowserRouter, HashRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function DynamicRouter({ children }: Props) {
    const isHash = window.location.protocol === 'file:';
  const Router = isHash ? HashRouter : BrowserRouter;

  return <Router>{children}</Router>;
}