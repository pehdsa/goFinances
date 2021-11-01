import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container,
    Title,
    Icon
} from './styles';

type Props = TouchableOpacityProps & {
    title: string
}

export const CategorySelectButton = ({ title, ...rest }: Props) => {
    return (
        <Container 
            {...rest}
            activeOpacity={0.7}
        >
            <Title>{ title }</Title>
            <Icon name="chevron-down" />
        </Container>
    );
}