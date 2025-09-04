import { login } from './api.js';
import { useState, useEffect } from 'react';
import Login from './page/Login/login.js';
import Index from './page/Index/index.js';
import history from './history.js';

function App({ isLogin }) {
  const [currentPath, setCurrentPath] = useState(history ? history.getCurrentPath() : '/');
  const [isLogin, setIsLogin] = useState(isLogin);
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
      return <Index isLogin={isLogin} />;
    } else {
      return <Login isLogin={isLogin} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;
