import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 18px 16px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Icon = styled(Feather)`
    font-size: ${ RFValue(20) }px;
    
    color: ${({ theme }) => theme.colors.text };
    
`;