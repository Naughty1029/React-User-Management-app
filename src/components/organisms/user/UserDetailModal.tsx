import { memo, useEffect, useState, VFC } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';
import { User } from '../../../types/api/User';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    isAdmin?: boolean;
};

export const UserDetailModal: VFC<Props> = memo((props) => {
    const { isOpen, onClose, user, isAdmin = false } = props;
    console.log(isAdmin);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setUsername(user?.username ?? '');
        setName(user?.name ?? '');
        setEmail(user?.email ?? '');
        setPhone(user?.phone ?? '');
    }, [user]);

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);

    const onClickUpdata = () => alert('a');
    return (
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
            <ModalOverlay>
                <ModalContent pb={2}>
                    <ModalHeader>ユーザー詳細</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mx={4}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>名前</FormLabel>
                                <Input value={username} onChange={onChangeUserName} isReadOnly={!isAdmin} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>フルネーム</FormLabel>
                                <Input value={name} onChange={onChangeName} isReadOnly={!isAdmin} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>MAIL</FormLabel>
                                <Input value={email} onChange={onChangeEmail} isReadOnly={!isAdmin} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>TEL</FormLabel>
                                <Input value={phone} onChange={onChangePhone} isReadOnly={!isAdmin} />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    {isAdmin && (
                        <ModalFooter>
                            <PrimaryButton onClick={onClickUpdata}>更新</PrimaryButton>
                        </ModalFooter>
                    )}
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
});
