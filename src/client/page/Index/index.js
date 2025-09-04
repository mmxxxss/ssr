import { getUserAccount } from '../../api';
import { useEffect, useState } from 'react';
import history from '../../history.js';
import { removeToken } from '../../token';

export default function Index({ isLogin, setIsLogin }) {
    const [account, setAccount] = useState({});

    useEffect(() => {
        if (isLogin) {
            getUserAccount().then(res => {
                setAccount(res.data);
            }).catch(err => {
                console.log(err, 'err');
            })
        }
    }, [isLogin])

    const handleLogout = () => {
        removeToken();
        setIsLogin(false);
        if (history) {
            history.push('/login');
        }
    };

    return (
        isLogin && (
            <div className="index">
                <div>欢迎, {account.username}!1111111</div>
                <button onClick={handleLogout}>登出</button>
            </div>
        )
    )
}