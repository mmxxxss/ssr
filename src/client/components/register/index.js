import { register } from '../../service/api';
import { useState } from 'react';
import { saveToken } from '../../token';
import './index.css';

function RegisterForm({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const response = await register({ username, password });
        console.log(response, 'response');
        if (response.status === 201) {
            saveToken(response.data.token);
            history.current.push('/login');
        }
    }

    return (
        <div className='register-form'>
            <input type='text' placeholder='请输入用户名' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' placeholder='请输入密码' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>注册</button>
        </div>
    )
}

export default RegisterForm;