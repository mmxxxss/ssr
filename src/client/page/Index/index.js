import { getUserAccount } from '../../service/api';
import { useEffect, useState } from 'react';
export default function Index({ history, userData }) {
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
        setIsLogin(false);
        history.current.push('/login');
    };
    return (
        (
            <div className="index">
                <div>欢迎, {JSON.stringify(userData)}!</div>
                {isLogin && <button onClick={handleLogout}>退出登录</button>}
            </div>
        )
    )
}