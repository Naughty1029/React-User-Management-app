import axios from 'axios';
import { useCallback, useState } from 'react';
import { User } from '../types/api/User';
import { useMessage } from './useMessage';

export const useAllUsers = () => {
    const { showMessage } = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<Array<User>>([]);

    const getUsers = useCallback(
        () => {
            setLoading(true);
            axios
                .get<Array<User>>('https://jsonplaceholder.typicode.com/users')
                .then((res) => {
                    setUsers(res.data);
                })
                .catch(() => {
                    showMessage({ title: '取得に失敗しました', status: 'error' });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        // eslint-disable-next-line
        [],
    );

    return { getUsers, users, loading };
};
