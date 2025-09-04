import './login.css'
import { useState } from 'react';
import LoginForm from '../../components/login';
import RegisterForm from '../../components/register';
import history from '../../history.js';

export default function Login({ isLoginState, setIsLoginState }) {
    const [activeTab, setActiveTab] = useState('login');

    const handleLoginSuccess = () => {
        setIsLoginState(true);
        if (history) {
            history.push('/');
        }
    };

    return (
        !isLoginState && (
            <div className="login">
                <div className='login-tab'>
                    <div className='login-tab-item' onClick={() => setActiveTab('login')}>登录</div>
                    <div className='login-tab-item' onClick={() => setActiveTab('register')}>注册</div>
                </div>
                <div className='login-content'>
                    {activeTab === 'login' && <LoginForm setIsLoginState={handleLoginSuccess} />}
                    {activeTab === 'register' && <RegisterForm setIsLoginState={handleLoginSuccess} />}
                </div>
            </div>
        )
    )
}