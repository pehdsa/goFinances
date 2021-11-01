import React, { useState, useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';


import { 
    Container,
    Header,
    UserInfo,
    UserPhoto,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    TransactionList,
    Transactions,
    Title,
    LogoutButton,
    LoadContainer
} from './styles';

import {
    HighlightCard,
    TransactionCard,
    TransactionCardProps
} from '../../components';


export type DataListProps = TransactionCardProps & {
    id: string
}

type HighlightData = {
    amount: string,
    date: string
}
type HighlightDataProps = {
    entries: HighlightData,
    expensive: HighlightData,
    total: HighlightData
}

export function Dashboard() {   
    
    const { user, logOut } = useAuth();
    const theme = useTheme();
    const [ data, setData ] = useState<DataListProps[]>()
    const [ highlightData, setHighlightData ] = useState<HighlightDataProps>({} as HighlightDataProps);
    const [ isLoading, setIsLoading ] = useState(true);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

    function getLastTransactionDate(transactions: DataListProps[], type: 'up' | 'down') {
        
        const lastTransactions = transactions
            .filter((item) => item.type === type)
            .pop();        
            
        if (!lastTransactions)
            return false;

        const lastTransactionFormated = Intl.DateTimeFormat('pt-BR', { 
            day: '2-digit',
            month: 'long',
            year: 'numeric' 
        }).format(new Date(lastTransactions.date));  

        return lastTransactionFormated;
    }

    const loadTransactions = async () => {
        const dataKey = `@gofinances:transactions_user:${ user.id }`;
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal  = 0

        const transactionFormated: DataListProps[] = transactions.length === 0 ? [] : transactions.map((item: DataListProps) =>{
            
            if (item.type === 'up') {
                entriesTotal += Number(item.amount)
            } else {
                expensiveTotal += Number(item.amount);
            }            

            const amount = Number(item.amount).toLocaleString('pt-BR',{ 
                style: 'currency', 
                currency: 'BRL' 
            });
            
            const date = Intl.DateTimeFormat('pt-BR', { 
                day: '2-digit',
                month: '2-digit',
                year: 'numeric' 
            }).format(new Date(item.date));            
        
            return {
                id: item.id,
                type: item.type,
                name: item.name,
                amount,
                category: item.category,
                date
            }
        });

        setData(transactionFormated);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'up');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'down');

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL'  
                }),
                date: lastTransactionEntries ? `Última entrada ${lastTransactionEntries}` : 'Não há transações'
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL'  
                }),
                date: lastTransactionExpensives ? `Última saída ${lastTransactionExpensives}` : 'Não há transações'
            },
            total: {
                amount: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL'  
                }),
                date: lastTransactionExpensives ? `01 à ${lastTransactionExpensives}` : 'Não há transações'
            }
        })        
        setIsLoading(false);
        
    }

    function handleLogOut() {
        logOut();
    }
    
    if (isLoading)
        return (
            <LoadContainer>
                <ActivityIndicator color={ theme.colors.text } size="small" />
            </LoadContainer>
        )

    return (
        <Container>
            <Header>
                
                <UserWrapper>
                    
                    <UserInfo>
                        <UserPhoto source={{ uri: user.photo }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>{ user.name.split(' ')[0] }</UserName>
                        </User>
                    </UserInfo>
                    
                    <LogoutButton
                        onPress={() => handleLogOut()}
                    >
                        <Icon name="power" />
                    </LogoutButton>

                </UserWrapper>                

            </Header>

            <HighlightCards>
                
                <HighlightCard 
                    title="Entradas"
                    amount={ highlightData.entries?.amount }
                    lastTransaction={ highlightData.entries.date }
                    type="up"
                />

                <HighlightCard 
                    title="Saídas"
                    amount={ highlightData.expensive?.amount }
                    lastTransaction={ highlightData.expensive.date }
                    type="down"
                />

                <HighlightCard 
                    title="Total"
                    amount={ highlightData.total?.amount }
                    lastTransaction={ highlightData.total.date }
                    type="total"
                />               
                

            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                
                <TransactionList 
                    data={ data }
                    keyExtractor={ item => item.id }
                    renderItem={({ item }) => <TransactionCard data={item} /> }                    
                />                  

            </Transactions>

        </Container>
    )
}