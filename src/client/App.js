import { useState, useEffect } from 'react';
import Login from './page/Login/login.js';
import Index from './page/Index/index.js';
import history from './history.js';

function App({ initialPath }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (initialPath !== undefined) {
      return initialPath;
    }
    return '/';
  });
  useEffect(() => {
    // 订阅路由变化
    if (history) {
      const unsubscribe = history.subscribe((path) => {
        setCurrentPath(path);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);
  return (
    <div>
      {currentPath === '/' && <Index />}
      {currentPath === '/login' && <Login />}
    </div>
  )
}

export default App;
