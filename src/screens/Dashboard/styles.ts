import styled from 'styled-components/native';
import { FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { DataListProps } from '.';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${ RFPercentage(42) }px;
    background-color: ${({ theme }) => theme.colors.primary}; 
`;

export const UserWrapper = styled.View`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 ${ RFValue(24) }px;

    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const UserPhoto = styled.Image`
    width: ${ RFValue(48) }px;
    height: ${ RFValue(48) }px;

    border-radius: 10px;
`;

export const User = styled.View`
    padding-left: ${ RFValue(16) }px;
`;

export const UserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
`;


export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`    
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${ RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    scrollEventThrottle: 16,
    contentContainerStyle: { paddingHorizontal: 16 }
})`
    width: 100%;
    position: absolute;
    margin-top: ${ RFPercentage(20) }px;
`;

export const TransactionList = styled(FlatList as new () => FlatList<DataListProps>).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})`
    
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 ${ RFValue(24) }px;
    padding-top: ${ RFPercentage(12) }px;
`;

export const Title = styled.Text`
    font-size: ${ RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: 16px;
`;

export const LoadContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
