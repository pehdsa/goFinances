import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container,
    Icon,
    Title
} from './styles';

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

type Props = TouchableOpacityProps & {
    title: string,
    type: 'up' | 'down',
    isActive: boolean
}

export const TransactionTypeButton = ({ title, type, isActive = false,  ...rest }: Props) => {
    return (
        <Container 
            {...rest} 
            isActive={ isActive } 
            type={ type }
        >
            <Icon name={ icons[type] } type={ type } />
            <Title>{ title }</Title>
        </Container>
    );
}

export default TransactionTypeButton;