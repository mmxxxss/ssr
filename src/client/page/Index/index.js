import { getUserAccount } from '../../api';
import { useEffect, useState } from 'react';
import history from '../../history.js';
import { removeToken } from '../../token';

export default function Index({ isLoginState, setIsLoginState }) {

    const [account, setAccount] = useState({});

    useEffect(() => {
        if (isLoginState) {
            getUserAccount().then(res => {
                setAccount(res.data);
            }).catch(err => {
                console.log(err, 'err');
            })
        }
    }, [isLoginState])

    const handleLogout = () => {
        removeToken();
        setIsLoginState(false);
        if (history) {
            history.push('/login');
        }
    };

    return (
        isLoginState && (
            <div className="index">
                <div>欢迎, {account.username}!1111111</div>
                <button onClick={handleLogout}>登出</button>
            </div>
        )
    )
}