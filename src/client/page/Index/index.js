import { getUserAccount } from '../../api';
import { useEffect, useState } from 'react';
import createHistory from '../../history.js';
import { removeToken } from '../../token';

export default function Index() {
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
        // 在客户端创建HistoryManager实例
        if (typeof window !== 'undefined') {
            const history = createHistory(window.initialPath);
            if (history) {
                history.push('/login');
                window.location.reload();
            }
        }
    };
    return (
        (
            <div className="index">
                <div>欢迎, {account.username}!</div>
                <button onClick={handleLogout}>登出</button>
            </div>
        )
    )
}