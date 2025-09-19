import { getUserAccount } from '../../service/api';
import { useEffect, useState } from 'react';
export default function Index({ history, userData }) {
    const [account, setAccount] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        if (Object.keys(userData).length) {
            setAccount(userData);
            setIsLogin(true);
        } else {
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
        }
    }, [])
    const handleLogout = () => {
        setIsLogin(false);
        history.current.push('/ssr/login');
    };
    return (
        (
            <div className="index">
                <div>欢迎, {JSON.stringify(account)}!</div>
                {isLogin && <button onClick={handleLogout}>退出登录</button>}
            </div>
        )
    )
}