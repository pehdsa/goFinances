import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    position: relative;
    width: 100%;
    margin-bottom: 8px;
`;

export const Error = styled.Text`
    width: 100%;
    text-align: right;
    font-size: ${RFValue(10)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.attention };
    margin-top: 5px;
`;