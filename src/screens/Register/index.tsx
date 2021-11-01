import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';


import { 
    InputForm,
    Button,
    TransactionTypeButton,
    CategorySelectButton
} from '../../components';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

import { CategorySelect } from '../CategorySelect';

type FormProps = {
    name: string,
    amount: string
}

const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    amount: Yup.number().typeError('Informe um valor numérico').positive('O Preço não pode ser negativo').required("Preço é obrigatório")
})

export const Register = () => {

    const { user } = useAuth()
    const navigation = useNavigation();
    const [ transactionType, setTransactionType ] = useState('');
    const [ categoryModalOpen, setCategoryModalOpen ] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [ category, setCategory ] = useState({
        key: 'category',
        name: 'Categoria'
    });
    
    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenModalSelectCategory() {
        setCategoryModalOpen(true);
    }

    function handleCloseModalSelectCategory() {
        setCategoryModalOpen(false);
    }


    async function handleRegister(form: FormProps) {        

        if(!transactionType)
            return Alert.alert("Erro","Selecione o tipo da transação");

        if(category.key === 'category')
            return Alert.alert("Erro", "Selecione a categoria");        
        

        const data = {
            id: uuid.v4(),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {

            const dataKey = `@gofinances:transactions_user:${ user.id }`;
            const storageData = await AsyncStorage.getItem(dataKey);
            const currentData = storageData ? JSON.parse(storageData) : [];

            currentData.push(data);
            
            await AsyncStorage.setItem(dataKey, JSON.stringify(currentData));

            handleResetForm();
            //@ts-ignore
            navigation.navigate('Listagem');
            
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "não foi possível cadastrar");
        }
    }

    function handleResetForm() {
        setTransactionType('');
        setCategory({ key: 'category', name: 'Categoria' })
        reset();
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    
                    <Fields>
                        
                        <InputForm
                            control={ control }
                            name="name" 
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={ errors.name && errors.name.message }
                        />
                        
                        <InputForm 
                            control={ control }
                            name="amount"
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={ errors.amount && errors.amount.message }
                        />

                        <TransactionTypes>
                            
                            <TransactionTypeButton 
                                title="Entrada"
                                type="up"
                                onPress={() => handleTransactionTypeSelect('up') }
                                isActive={ transactionType === 'up' }
                            />

                            <TransactionTypeButton 
                                title="Saída"
                                type="down"
                                onPress={() => handleTransactionTypeSelect('down') }
                                isActive={ transactionType === 'down' }
                            />

                        </TransactionTypes>

                        <CategorySelectButton 
                            title={ category.name }
                            onPress={ handleOpenModalSelectCategory }
                        />

                    </Fields>

                    <Button 
                        title="Enviar" 
                        onPress={ handleSubmit(handleRegister) }
                    />

                </Form>

                <Modal
                    visible={ categoryModalOpen }
                    animationType="slide"
                >
                    <CategorySelect 
                        category={ category }
                        setCategory={ setCategory }
                        closeSelectCategory={ handleCloseModalSelectCategory }
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}