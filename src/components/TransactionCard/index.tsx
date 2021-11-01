import React from 'react';
import { View } from 'react-native';
import { categories } from '../../utils/categories';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';


export type TransactionCardProps = {
    type: 'up' | 'down';
    name: string,
    amount: string,
    category: string,
    date: string
}

type Props = {
    data: TransactionCardProps
}

export const TransactionCard = ({ data }: Props) => {

    const [ category ] = categories.filter(item => item.key === data.category);
    if (!category)
    return <View />;

    return (
        <Container>
            <Title>{ data.name }</Title>
            <Amount type={ data.type }>{ data.type === 'down' && '- ' }{ data.amount }</Amount>

            <Footer>
                <Category>
                    <Icon name={ category.icon } />
                    <CategoryName>{ category.name }</CategoryName>
                </Category>
                <Date>{ data.date }</Date>
            </Footer>
        </Container>
    );
}