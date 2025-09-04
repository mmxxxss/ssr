import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { renderToString } from 'react-dom/server';
import App from '../client/App.js';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }


  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const app = express();

// 解析 JSON 请求体
app.use(express.json());

// 允许所有域请求
app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist')));
// Serve static files
app.use(express.static('dist'));

// Handle all routes, but exclude API routes and static files
// 处理所有路由请求
app.get('*', async (req, res) => {
  // 1. 根据请求 URL 创建服务器端路由
  const html = renderToString(<App />);
  // const response = await getUserList();
  // const data = response.data;
  // const script = `
  //   <script>
  //     window.__INITIAL_DATA__ = ${JSON.stringify(data)};
  //   </script>
  // `;
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

// 添加对 /login 路由的支持
app.get('/login', async (req, res) => {
  const html = renderToString(<App />);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});