import axios from 'axios';
import { useState } from 'react';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../types/api/User';
import { useLoginUser } from './useLoginUser';
import { useMessage } from './useMessage';

export const useAuth = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { showMessage } = useMessage();
    const { setLoginUser } = useLoginUser();

    const login = useCallback(
        (id: string) => {
            setLoading(true);
            axios
                .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then((res) => {
                    if (res.data) {
                        const isAdmin = res.data.id === 10 ? true : false;
                        setLoginUser({ ...res.data, isAdmin });
                        showMessage({ title: 'ログインしました', status: 'success' });
                        history.push('/home');
                    } else {
                        showMessage({ title: 'ユーザーがみつかりません', status: 'error' });
                        setLoading(false);
                    }
                })
                .catch(() => {
                    showMessage({ title: 'ログインできません', status: 'error' });
                    setLoading(false);
                });
        },
        [history, showMessage, setLoginUser],
    );

    return { login, loading };
};
