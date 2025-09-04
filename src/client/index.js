
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { useState } from 'react';
import { hasToken } from './token';

const container = document.getElementById('root');
// delete window.__INITIAL_DATA__;
const initialData = window.__INITIAL_DATA__;

// 检查是否有token来初始化登录状态
const isLoggedIn = hasToken();

function Root() {
  const [isLogin, setIsLogin] = useState(isLoggedIn);
  
  return <App initialData={initialData} isLogin={isLogin} setIsLogin={setIsLogin} />;
}

hydrateRoot(container, <Root />);
