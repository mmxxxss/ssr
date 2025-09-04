
import { hydrateRoot } from 'react-dom/client';
import App from './App';
const container = document.getElementById('root');

function Root() {
  return <App initialPath={typeof window !== 'undefined' ? window.initialPath : '/'} />;
}

hydrateRoot(container, <Root />);
