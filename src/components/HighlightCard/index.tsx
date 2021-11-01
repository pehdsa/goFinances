import React from 'react';
import { View } from 'react-native';

import { 
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';


type HighlightCardProps = {
    type: 'up' | 'down' | 'total'
    title: 'Entradas'|'Saídas'|'Total',
    amount: string,
    lastTransaction: string,
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export const HighlightCard = ({ title, amount, lastTransaction, type }: HighlightCardProps) => {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{ title }</Title>
                <Icon name={icon[type]} type={type} />
            </Header>

            <Footer>
                <Amount type={type}>{ amount }</Amount>
                <LastTransaction type={type}>{ lastTransaction }</LastTransaction>
            </Footer>
        </Container>
    );
}