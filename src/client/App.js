import { useState, useEffect, useRef } from 'react';
import Login from './page/Login/login.js';
import Index from './page/Index/index.js';
import createHistory from './history.js';

function App({ initialPath, userData }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (initialPath !== undefined) {
      return initialPath;
    }
    return '/';
  });
  let history = useRef(null);
  useEffect(() => {
    // 在客户端创建HistoryManager实例
    if (typeof window !== 'undefined') {
      history.current = createHistory(window.initialPath);
      // 订阅路由变化
      const unsubscribe = history.current.subscribe((path) => {
        setCurrentPath(path);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <div>
      <div>userData: {JSON.stringify(userData)}</div>
      {currentPath === '/' && <Index history={history} />}
      {currentPath === '/login' && <Login history={history} />}
    </div>
  )
}

export default App;
