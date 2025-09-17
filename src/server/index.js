import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import App from '../client/App.js';
const { getUserInfo } = require('./rpc-client');
const app = express();

// 解析 JSON 请求体
app.use(express.json());

// 允许所有域请求
app.use(cors());
app.use(express.static('dist'));

// 添加对 /login 路由的支持
app.get('/login', async (req, res) => {
  // 只在生产环境中尝试连接远程gRPC服务
  let userData = {};
  if (process.env.NODE_ENV === 'production') {
    try {
      userData = await getUserInfo("10");
      userData = userData
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // 使用默认数据
      userData = { username: 'defaultuser', email: 'default@example.com' };
    }
  }

  const html = renderToString(<App userData={userData} initialPath='/login' />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Login Page</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.initialPath = '/login';
          window.userData = ${JSON.stringify(userData)};
        </script>
        <script src="http://8.130.87.194/client.js"></script>
      </body>
    </html>
  `);
});

// Handle all routes, but exclude API routes and static files
// 处理所有路由请求
app.get('/', async (req, res) => {
  // 1. 根据请求 URL 创建服务器端路由
  let userData = {};
  if (process.env.NODE_ENV === 'production') {
    try {
      userData = await getUserInfo("10");
      userData = userData
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // 使用默认数据
      userData = { username: 'defaultuser', email: 'default@example.com' };
    }
  }
  // 2. 渲染 React 组件树为字符串
  const html = renderToString(<App userData={userData} initialPath='/' />);
  // 3. 拼接完整 HTML 并返回
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with React Router</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <!-- 客户端脚本：用于 hydration -->
        <script src="http://8.130.87.194/client.js"></script>
        <script>
          window.initialPath = '/';
          window.userData = ${JSON.stringify(userData)};
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});