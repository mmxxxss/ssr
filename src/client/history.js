class HistoryManager {
  constructor(initialPath) {
    this.listeners = null;
    // 在服务器端不执行window相关代码
    if (typeof window !== 'undefined') {
      this.currentPath = window.location.pathname;
      this.init();
    } else {
      this.currentPath = initialPath || '/ssr';
    }
  }

  init() {
    // 监听浏览器前进后退
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => {
        this.currentPath = window.location.pathname;
        this.notifyListeners();
      });
    }
  }

  push(path) {
    if (typeof window !== 'undefined' && this.currentPath !== path) {
      let realPath = path.split("?")[0]
      this.currentPath = realPath;
      window.history.pushState(null, '', path);
      this.notifyListeners();
    }
  }

  replace(path) {
    if (typeof window !== 'undefined' && this.currentPath !== path) {
      this.currentPath = path;
      window.history.replaceState(null, '', path);
      this.notifyListeners();
    }
  }

  getCurrentPath() {
    return this.currentPath;
  }

  subscribe(listener) {
    this.listeners = listener;
    return () => {
      this.listeners = null;
    };
  }

  notifyListeners() {
    this.listeners(this.currentPath);
  }
}

// 在服务器端不创建HistoryManager实例
const createHistory = (initialPath) => {
  return typeof window !== 'undefined' ? new HistoryManager(initialPath) : null;
};

export default createHistory;