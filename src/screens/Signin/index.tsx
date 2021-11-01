import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SigninSocialButton } from '../../components';

import { useAuth } from '../../hooks/auth';

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SigninTitle,
    Footer,
    FooterWrapper
} from './styles';

export const Signin = () => {

    const theme = useTheme()
    const { signInWithGoogle, signInWithApple } = useAuth();
    const [ isLoading, setIsLoading ] = useState(false);

    async function handleSignInGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();            
        } catch (erro) {
            Alert.alert('Erro', erro);
            setIsLoading(false);
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);
            return await signInWithApple();            
        } catch (erro) {
            Alert.alert('Erro', erro);
            setIsLoading(false);
        }
    }

    return (
        <Container>

            <Header>
                <TitleWrapper>
                    
                    <LogoSvg 
                        width={ RFValue(120) } 
                        height={ RFValue(68) } 
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>

                </TitleWrapper>

                <SigninTitle>
                    Faça seu login com{'\n'}
                    uma das contas abaixo
                </SigninTitle>

            </Header>

            <Footer>
                
                <FooterWrapper>
                    
                    <SigninSocialButton 
                        svg={ GoogleSvg }
                        title="Entrar com Google" 
                        onPress={ handleSignInGoogle }
                    />
                    
                    { Platform.OS === 'ios' && (
                        <SigninSocialButton 
                            svg={ AppleSvg }
                            title="Entrar com Apple" 
                            onPress={ handleSignInWithApple }
                        />
                    ) }

                </FooterWrapper>

                { isLoading && <ActivityIndicator color={ theme.colors.shape } size={ 20 } /> }

            </Footer>

        </Container>
    );
}