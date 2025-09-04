import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import App from '../client/App.js';

const app = express();

// 解析 JSON 请求体
app.use(express.json());

// 允许所有域请求
app.use(cors());
app.use(express.static('dist'));

// 添加对 /login 路由的支持
app.get('/login', async (req, res) => {
  const html = renderToString(<App isLogin={false} />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Login Page</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

// Handle all routes, but exclude API routes and static files
// 处理所有路由请求
app.get('*', async (req, res) => {
  // 1. 根据请求 URL 创建服务器端路由
  const html = renderToString(<App isLogin={true} />);
  // 2. 渲染 React 组件树为字符串
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
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});