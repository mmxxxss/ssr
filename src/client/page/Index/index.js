import { getUserAccount } from '../../api';
import { useEffect, useState } from 'react';
import { removeToken } from '../../token';

export default function Index({ history }) {
    const [account, setAccount] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        getUserAccount().then(res => {
            setAccount(res.data);
            setIsLogin(true);
        }).catch(err => {
            if (err.response.status === 401) {
                setIsLogin(false);
            } else {
                console.log(err, 'err');
            }
        })
    }, [])
    const handleLogout = () => {
        removeToken();
        setIsLogin(false);
        history.current.push('/login');
    };
    return (
        (
            <div className="index">
                <div>欢迎, {account.username}!</div>
                <button onClick={handleLogout}>{isLogin ? '退出登录' : '登录'}</button>
            </div>
        )
    )
}