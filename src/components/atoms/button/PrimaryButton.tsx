import { memo, VFC } from 'react';
import { Button } from '@chakra-ui/react';

export const PrimaryButton: VFC = memo((props) => {
    const { children } = props;
    return (
        <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>
            {children}
        </Button>
    );
});
