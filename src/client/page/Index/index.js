import { getUserAccount } from '../../api';
import { useEffect, useState } from 'react';
import { removeToken } from '../../token';

export default function Index({ history }) {
    const [account, setAccount] = useState({});
    useEffect(() => {
        getUserAccount().then(res => {
            setAccount(res.data);
        }).catch(err => {
            console.log(err, 'err');
        })
    }, [])
    const handleLogout = () => {
        removeToken();
        history.current.push('/login');
    };
    return (
        (
            <div className="index">
                <div>欢迎, {account.username}!</div>
                <button onClick={handleLogout}>退出登录</button>
            </div>
        )
    )
}