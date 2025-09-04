import './login.css'
import { useState } from 'react';
import LoginForm from '../../components/login';
import RegisterForm from '../../components/register';
import history from '../../history.js';

export default function Login({ isLogin, setIsLogin }) {
    const [activeTab, setActiveTab] = useState('login');
    
    const handleLoginSuccess = () => {
        setIsLogin(true);
        if (history) {
            history.push('/');
        }
    };
    
    return (
        !isLogin && (
            <div className="login">
                <div className='login-tab'>
                    <div className='login-tab-item' onClick={() => setActiveTab('login')}>登录</div>
                    <div className='login-tab-item' onClick={() => setActiveTab('register')}>注册</div>
                </div>
                <div className='login-content'>
                    {activeTab === 'login' && <LoginForm setIsLogin={handleLoginSuccess} />}
                    {activeTab === 'register' && <RegisterForm setIsLogin={handleLoginSuccess} />}
                </div>
            </div>
        )
    )
}