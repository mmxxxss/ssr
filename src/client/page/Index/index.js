import { getUserAccount } from '../../api';
import { useEffect, useState } from 'react';
import history from '../../history.js';
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
        if (history) {
            history.push('/login');
        }
    };
    return (
        (
            <div className="index">
                <div>欢迎, {account.username}!1111111</div>
                <button onClick={handleLogout}>登出</button>
            </div>
        )
    )
}