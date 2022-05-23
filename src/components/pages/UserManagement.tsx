import { memo, useCallback, VFC } from 'react';
import { Center, Spinner, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import { UserCard } from '../organisms/user/UserCard';
import { useAllUsers } from '../../hooks/useAllUsers';
import { useEffect } from 'react';
import { UserDetailModal } from '../organisms/user/UserDetailModal';
import { useSelectedUser } from '../../hooks/useSelectedUser';
import { useLoginUser } from '../../hooks/useLoginUser';

export const UserManagement: VFC = memo(() => {
    const { getUsers, users, loading } = useAllUsers();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onSelectUser, selectedUser } = useSelectedUser();
    const { loginUser } = useLoginUser();

    useEffect(
        () => {
            getUsers();
        },
        // eslint-disable-next-line
        [],
    );

    const onClickUser = useCallback(
        (id: number) => {
            onSelectUser({ id: id, users: users, onOpen: onOpen });
        },
        // eslint-disable-next-line
        [users, onSelectUser, onOpen],
    );

    return (
        <>
            {loading ? (
                <Center h="100vh">
                    <Spinner />
                </Center>
            ) : (
                <Wrap p={{ base: 4, md: 10 }}>
                    {users.map((user) => (
                        <WrapItem key={user.id} mx="auto">
                            <UserCard
                                id={user.id}
                                imageUrl="https://source.unsplash.com/random"
                                userName={user.username}
                                fullName={user.name}
                                onClick={onClickUser}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            )}
            <UserDetailModal isOpen={isOpen} onClose={onClose} user={selectedUser} isAdmin={loginUser?.isAdmin} />
        </>
    );
});
