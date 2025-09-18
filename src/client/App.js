import { useState, useEffect, useRef } from 'react';
import Login from './page/Login/login.js';
import Index from './page/Index/index.js';
import createHistory from './history.js';

function App({ initialPath = typeof window !== 'undefined' ? window.initialPath : '/', userData = {} }) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const history = useRef(null);
  
  useEffect(() => {
    // 在客户端创建HistoryManager实例
    if (typeof window !== 'undefined') {
      history.current = createHistory(initialPath);
      // 订阅路由变化
      const unsubscribe = history.current.subscribe((path) => {
        setCurrentPath(path);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [initialPath]);

  // 确保在hydration过程中，服务器端和客户端渲染的组件结构一致
  return (
    <div>
      {currentPath === '/ssr' && <Index history={history} userData={userData} />}
      {currentPath === '/ssr/login' && <Login history={history} />}
    </div>
  )
}

export default App;
