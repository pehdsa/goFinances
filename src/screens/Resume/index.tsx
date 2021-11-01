import React, { useState, useCallback } from 'react';

import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';
import { useNavigation } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
    HistoryCard
} from '../../components';

import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MounthSelect,
    MounthSelectButton,
    MounthSelectIcon,
    Mounth,
    LoadContainer
} from './styles';



type TransactionProps = {    
        type: 'up' | 'down';
        name: string,
        amount: string,
        category: string,
        date: string    
}

type CategoryData = {
    key: string,
    name: string,
    total: number,
    totalFormatted: string
    color: string,
    percent: string
}

export const Resume = () => {
    const theme = useTheme();
    const navigation = useNavigation();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ selectedDate, setSelectedDate ] = useState(new Date());
    const [ totalByCategoris, setTotalByCategories ] = useState<CategoryData[]>([]);

    function handleDateChange(action: 'next' | 'prev') {
        //setIsLoading(true);
        if (action === 'next')
            setSelectedDate(addMonths(selectedDate, 1));
        else
            setSelectedDate(subMonths(selectedDate, 1));        
    }
    /*
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });      
        return unsubscribe;        
    },[]);
    */
    useFocusEffect(useCallback(() => {
        loadData();
    },[selectedDate]));

    async function loadData() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter((expensive: TransactionProps) => 
            expensive.type === 'down' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        );

        const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionProps) => {
            return acumullator + Number(expensive.amount);
        },0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionProps) => {
                if (expensive.category === category.key){
                    categorySum += Number(expensive.amount)
                }
            });

            if (categorySum > 0){
                const totalFormatted = categorySum.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                });

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                });
            }            

        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);

    }

    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>

            { isLoading ? (
                <LoadContainer>
                    <ActivityIndicator color={ theme.colors.text } size="small" />
                </LoadContainer>
            ) : (
                <Content
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={{ padding: 25 }}
                >
                    
                    <MounthSelect>
                        
                        <MounthSelectButton onPress={() => handleDateChange('prev')}>
                            <MounthSelectIcon name="chevron-left" />
                        </MounthSelectButton>

                        <Mounth>   
                            { format(selectedDate, 'MMMM, yyyy', { locale: ptBR }) }                   
                        </Mounth>

                        <MounthSelectButton onPress={() => handleDateChange('next')}>
                            <MounthSelectIcon name="chevron-right" />
                        </MounthSelectButton>

                    </MounthSelect>

                    <ChartContainer>
                        <VictoryPie 
                            data={totalByCategoris}
                            colorScale={ totalByCategoris.map(category => category.color) }
                            style={{
                                labels: { 
                                    fontSize: RFValue(15), 
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={ 60 }
                            x="percent"
                            y="total"
                        />
                    </ChartContainer>
        

                    {
                        totalByCategoris.map((item) => (                        
                            <HistoryCard 
                                key={ item.key }
                                color={ item.color }
                                title={ item.name }
                                amount={ item.totalFormatted }
                            />                        
                        ))
                    }
                </Content>
            ) }

        </Container>
    );
}
