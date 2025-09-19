import { login } from '../../service/api';
import { useState } from 'react';
import './index.css';

function LoginForm({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        const response = await login({ username, password });
        if (response.status === 200) {
            history.current.push(`/ssr?user_id=${response.data.data.userId}`);
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