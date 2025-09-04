// token管理模块

// 保存token到localStorage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// 从localStorage获取token
export const getToken = () => {
  return localStorage.getItem('token');
};

// 从localStorage移除token
export const removeToken = () => {
  localStorage.removeItem('token');
};

// 检查是否存在token
export const hasToken = () => {
  return !!getToken();
};

// 为API请求添加Authorization头
export const withAuthHeader = (config = {}) => {
  const token = getToken();
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      }
    };
  }
  return config;
};