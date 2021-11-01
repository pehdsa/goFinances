import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;

`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const MounthSelect = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const MounthSelectButton = styled(TouchableOpacity)`
    width: ${RFValue(30)}px;
    height: ${RFValue(30)}px;
    align-items: center;
    justify-content: center;    
`;

export const MounthSelectIcon = styled(Feather)`
    font-size: ${RFValue(20)}px;
`;

export const Mounth = styled.Text`
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const LoadContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;