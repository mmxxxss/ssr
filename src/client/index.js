
import { hydrateRoot } from 'react-dom/client';
import App from './App';
const container = document.getElementById('root');
// delete window.__INITIAL_DATA__;
// 检查是否有token来初始化登录状态
function Root() {
  return <App />;
}

hydrateRoot(container, <Root />);
