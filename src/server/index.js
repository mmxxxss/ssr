import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { renderToString } from 'react-dom/server';
import App from '../client/App.js';
const { getUserInfo } = require('./rpc-client');
const app = express();

// 解析 JSON 请求体
app.use(express.json());

// 解析 Cookie
app.use(cookieParser());

// 允许所有域请求
app.use(cors());
app.use(express.static('dist'));

// 添加对 /login 路由的支持
app.get('/ssr/login', async (req, res) => {
  const html = renderToString(<App initialPath='/ssr/login' />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Login Page</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.initialPath = '/ssr/login';
        </script>
        <script src="http://8.130.87.194/client.js"></script>
      </body>
    </html>
  `);
});

// Handle all routes, but exclude API routes and static files
// 处理所有路由请求
app.get('/ssr', async (req, res) => {
  // 1. 根据请求 URL 创建服务器端路由
  let userData = {};
  if (process.env.NODE_ENV === 'production') {
    try {
      // 优先从查询参数获取user_id
      let user_id = req.query.user_id;
      // 如果查询参数中没有user_id，尝试从cookie中解析token
      if (req.cookies.token) {
        const token = req.cookies.token;
        // 验证token并解析出user_id
        if (token) {
          try {
            // 使用JWT验证token
            jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
          } catch (tokenError) {
            console.error('Token verification failed:', tokenError);
            // Token验证失败，使用访客身份
          }
        }
      }
      // 如果有user_id，获取用户信息
      if (user_id) {
        userData = await getUserInfo(user_id);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }
  // 2. 渲染 React 组件树为字符串
  const html = renderToString(<App userData={userData} initialPath='/ssr' />);
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
        <script>
          window.initialPath = '/ssr';
          window.userData = ${JSON.stringify(userData)};
        </script>
        <script src="http://8.130.87.194/client.js"></script>
      </body> 
    </html>
  `);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});