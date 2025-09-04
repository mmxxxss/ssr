import { login } from './api.js';
import { useState, useEffect } from 'react';
import Login from './page/Login/login.js';
import Index from './page/Index/index.js';
import history from './history.js';

function App({ isLogin }) {

  const [currentPath, setCurrentPath] = useState(history ? history.getCurrentPath() : '/');
  const [isLoginState, setIsLoginState] = useState(isLogin);
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
      <Login isLoginState={isLoginState} setIsLoginState={setIsLoginState} />
      <Index isLoginState={isLoginState} setIsLoginState={setIsLoginState} />;
    </div>
  );
}

export default App;
