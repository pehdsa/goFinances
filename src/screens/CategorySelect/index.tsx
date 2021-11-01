import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';

import { Button } from '../../components';

import { 
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
} from './styles';

type CategoryProps = {
    key: string,
    name: string
}

type Props = {
    category: CategoryProps,
    setCategory: (category: CategoryProps) => void,
    closeSelectCategory: () => void
}

export const CategorySelect = ({ category, setCategory, closeSelectCategory }: Props) => {

    function handleCategorySelect(category: CategoryProps) {
        setCategory(category);
    }

    return (
        <Container>

            <Header>
                <Title>Categoria</Title>
            </Header>

            <FlatList 
                data={ categories }
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={ category.key === item.key }
                    >
                        <Icon name={item.icon} />
                        <Name>{ item.name }</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={ closeSelectCategory }
                />
            </Footer>

        </Container>
    );
}