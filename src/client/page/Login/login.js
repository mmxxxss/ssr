import './login.css'
import { useState } from 'react';
import LoginForm from '../../components/login';
import RegisterForm from '../../components/register';
export default function Login({ history }) {
    const [activeTab, setActiveTab] = useState('login');
    return (
        (
            <div className="login">
                <div className='login-tab'>
                    <div className={`login-tab-item ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>登录</div>
                    <div className={`login-tab-item ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>注册</div>
                </div>
                <div className='login-content'>
                    {activeTab === 'login' && <LoginForm history={history} />}
                    {activeTab === 'register' && <RegisterForm history={history} />}
                </div>
            </div>
        )
    )
}