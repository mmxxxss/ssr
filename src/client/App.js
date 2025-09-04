import { useState, useEffect } from 'react';
import Login from './page/Login/login.js';
import Index from './page/Index/index.js';
import createHistory from './history.js';

function App({ initialPath }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (initialPath !== undefined) {
      return initialPath;
    }
    return '/';
  });

  useEffect(() => {
    // 在客户端创建HistoryManager实例
    let history;
    if (typeof window !== 'undefined') {
      history = createHistory(window.initialPath);
      // 订阅路由变化
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
