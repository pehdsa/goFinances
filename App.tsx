
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import Theme from './src/global/styles/theme';

import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {

    const { isLoading } = useAuth();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoaded || isLoading) {
        return <AppLoading />;
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <ThemeProvider theme={ Theme }>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
