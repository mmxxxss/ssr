import { login } from '../../api';
import { useState } from 'react';
import { saveToken } from '../../token';
import './index.css';

function LoginForm({ setIsLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async () => {
        const response = await login({ username, password });
        console.log(response, 'response');
        if (response.status === 200) {
            saveToken(response.data.token);
            setIsLogin(true);
        }
    }
    
    return (
        <div className='login-form'>
            <input type='text' placeholder='请输入用户名' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='请输入密码' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>登录</button>
        </div>
    )
}

export default LoginForm;