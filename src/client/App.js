import { login } from './api.js';
import { useState, useEffect } from 'react';
import Login from './page/Login/login.js';
import Index from './page/Index/index.js';
import history from './history.js';

function App({ initialData, isLogin, setIsLogin }) {
  const [currentPath, setCurrentPath] = useState(history ? history.getCurrentPath() : '/');

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

  const renderPage = () => {
    if (isLogin) {
      return <Index isLogin={isLogin} setIsLogin={setIsLogin} />;
    } else {
      return <Login isLogin={isLogin} setIsLogin={setIsLogin} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;
